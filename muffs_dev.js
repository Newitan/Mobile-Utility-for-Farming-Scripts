/*
    Introducing the Mobile Utility for Farming Scripts
*/
let api = null, pwd = null, inv = null, skills= null;
let choices = null;
const parser = new DOMParser();
let debug = false;
let itemsData = 'https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/items.txt';


load();
//Add scripts to the page
let addPastedScript = function addPastedScript(){
  let box = document.querySelector("[name=scriptBox]");
  let s = document.createElement("script");
  s.text=box.value;
  box.value="";
  s.name="newScript_"+Math.floor(Math.random()*5000);
  window.parent.parent.parent.document.querySelector("head").appendChild(s);
}
let addURLScript = function addURLScript(url){
      let s = document.createElement("script");
  if(url==undefined){
    let box = document.querySelector("[name=urlBox]");

    url = box.value;
    box.value="";
  }
  s.src=url;


  window.parent.parent.parent.document.querySelector("head").appendChild(s);
}
//Value for home page
function goHome(){
setHome();
setFrame(" ");

setFrame(localStorage.getItem("muffs_home"));

}



function setHome(){

    let home= "<h1>Mobile Utility for Farming Scripts. </h1><div>"+getPreLoads()+"<br />Link New Script: <input type=text name = 'urlBox' length= 300 /><input type=submit value='Add Script by URL' onclick='"+addURLScript+" addURLScript(); ' /><br />Paste new script: <input type=submit value='Add Pasted Script' onclick='"+addPastedScript+" addPastedScript();window.parent.parent.sethome();'/><br /><textarea col='30' rows='100' name='scriptBox' id='scriptBox'></textarea><div>";
    localStorage.setItem("muffs_home",home);
    setFrame(home);
}
setHome();
//Preload from local storage
function getPreLoadData(){let data = JSON.parse(localStorage.getItem('muffs_scripts'));
  if(data==null){data = {};} return data;}

function getPreLoads(){
  let msg = "";
  let data = getPreLoadData();
   
    Object.keys(data).forEach(d=>{

     
        addURLScript(data[d].src);
        msg+=""+d+": ";
        msg+="<input type=submit value="+d+" onclick='window.parent.parent."+data[d].com+"' />";//window.parent.parent."+command+"
  
        });
        
    


  return msg;
}
function runLoader(s){
   let data = getPreLoadData();
if(s.name in data){console.log('already loaded');}else{
 
  data[s.name] = s;
  localStorage.setItem('muffs_scripts',JSON.stringify(data));
  setHome();
}

}

//Refreshing the API
async function reapi() {
  try {
    let p = await fetch(new Request('api.php?', {
      credentials: 'include',
      method: 'POST',
      body: new URLSearchParams('what=status&for=mobile_Nytan')
    }));
    if (p.ok) {
      let t = await p.text();
      if(debug){setFrame(t);}
      api = JSON.parse(t);
      pwd = api.pwd;
    } else {
      console.error('Failed to fetch status API');
      return null;
    }

    p = await fetch(new Request('api.php?', {
      credentials: 'include',
      method: 'POST',
      body: new URLSearchParams('what=inventory&for=mobile_Nytan')
    }));
    if (p.ok) {
      let t = await p.text();
      inv = JSON.parse(t);
    } else {
      console.error('Failed to fetch inventory API');
    }

    return api;
  } catch (error) {
    console.error('Error in reapi:', error);
    return null;
  }
}

//Set the mainframe content
async function setFrame(t){
  parent.frames['mainpane'].document.body.innerHTML = t;
}
async function updateFrame(t){
    console.log(t);
    let d = document.createElement('div');
    d.innerHTML=t;
    parent.frames['mainpane'].document.body.appendChild(d);
}

//Limit speed
async function throttle(time){
  return new Promise(resolve => setTimeout(resolve, time));
}
// Visit a URL with options
async function visit(u, o, auth2) {
 await throttle(3000);
  try {
    let auth = '';
    if (auth2) {
      auth = '&pwd=' + pwd;
    }
    console.log('Visiting:', u, o, auth);
    let p = await fetch(new Request(u, {
      credentials: 'include',
      method: 'POST',
      body: new URLSearchParams(o + auth)
    }));
    if (p.ok) {
      let t = await p.text();
      await setFrame(t);
      await reapi();
     
      return t;
    } else {
      console.error('Visit failed:', p.status);
      return '';
    }
  } catch (error) {
    console.error('Error in visit:', error);
    return '';
  }

}

async function getProtection(e) {
    let page = await visit('charsheet.php');
   
  const regex = new RegExp(`${e} Protection:</td><td><b>.*?\((\\d+)\)</b>`, 'i');
  let match = page.match(regex);
   
    match = match[0].slice(0,match[0].indexOf('align=right'),-match[0].length);
    match = match.replace(/[^0-9]/g, '');
    
  return match;}



async function getSkills() {
  let page = await visit('charsheet.php');
 
    let step1 = page.split('"skill", 350, 300)\'>');
    let skillz = [];
    step1.shift()
    step1.forEach(s=>{
      s= s.split('</a>');
      skillz[skillz.length]=s[0].toLowerCase();
    
    });
    
    return skillz;
}

function hasSkill(s){

  if(skills.includes(s.toLowerCase())){return true;}
  return false;
}


let items = [];

async function processItems(){
/*
  This function takes the Item.txt csv file from kolMafia and converts it to an array of JSON objects. 
*/
    const csv = await fetch(itemdata);
  
    const its = csv.split('\n');
    console.log(its);
    its.forEach(it =>{
        it = it.split('\t');
        if(it[0]!='#'){
            console.log(it);
            items[it[0]] = {'id':it[0],'name':it[1],'descid':it[2],'image':it[3],'use':it[4],'access':it[5],'autosell':it[6],'pluaral':it[7]};
        }
    });
    items.forEach(item =>{console.log(item);});
}
// Item class
class Item{
  constructor(itemnumber,	name,	descid,	image,	use,	access,	autosell,	plural){
    this.itemnumber =itemnumber;
    this.name = name;
    this.descid =descid;
    this.image = image;
    this.use=use;
    this.access=access;
    this.autosell = autosell;
    this.pluaralitem= plural;
    
  }
  toString(){return this.name;}
  toInt(){return this.itemnumber}
  static get(input){

   let it =NaN;
    switch(typeof input){
      case 'number':
        it = items[input];
         if(it!=undefined){return new Item(it.id,	it.name,	it.descid,	it.image,	it.use,	it.access,	it.autosell,	it.plural);}
        break;
      case 'string':
        let itemNames = items.map(item => item.name);
        console.log(itemNames);
        console.log(input);
        it = items[itemNames.indexOf(input)];
        console.log(it);
   
         if(it!=undefined){return new Item(it.id,	it.name,	it.descid,	it.image,	it.use,	it.access,	it.autosell,	it.plural);}    
        break;
      }
      return undefined;
  }

}




async function load(){
  reapi();
  skills = await getSkills();
  processItems();
setHome();
}
