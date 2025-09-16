/*
    Introducing the Mobile Utility for Farming Scripts
*/

let api = null, pwd = null, inv = null;
let choices = null;
const parser = new DOMParser();
let debug = false;

let addPastedScript = function addPastedScript(){
  let box = document.querySelector("[name=scriptBox]");
  let s = document.createElement("script");
  s.text=box.value;
  box.value="";
  s.name="newScript_"+Math.floor(Math.random()*5000);
  window.parent.parent.parent.document.querySelector("head").appendChild(s);
}
let addURLScript = function addURLScript(){
  let box = document.querySelector("[name=urlBox]");
  let s = document.createElement("script");
  s.src=box.value;
  box.value="";
  s.name="newScript_"+Math.floor(Math.random()*5000);
  window.parent.parent.parent.document.querySelector("head").appendChild(s);
}
let home = "<script> </script><h1>Mobile Utility for Farming Scripts. </h1><table><tr><td>Link New Script: <input type=text name = 'urlBox' length= 300 /></td><td><input type=submit value='Add Script by URL' onclick='"+addURLScript+" addURLScript();'/></td></tr><tr><td >Paste new script: </td><td><input type=submit value='Add Pasted Script' onclick='"+addPastedScript+" addPastedScript();'/></td></tr><tr><td colspan=2><textarea col='100' rows='30' name='scriptBox' id='scriptBox'></textarea></td></tr></table>";




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
// Visit a URL with options
async function visit(u, o, auth2) {
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
function goHome(){

setFrame(' ');

setFrame(home);

}




//Launch Home Page

 setTimeout(goHome(),3000);




