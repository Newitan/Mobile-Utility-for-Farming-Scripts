/*
    Introducing the Mobile Utilities for Farming Scripts
*/
let api = null, pwd = null, inv = null;
let choices = null;
const parser = new DOMParser();
let debug = false;
/*
let s = document.createElement('Items_js');s.src='http://157.245.183.113/kolItems.js';window.parent.parent.document.querySelector('head').appendChild(s);
s = document.createElement('Volcano_js');s.src='http://157.245.183.113/volcano.js';window.parent.parent.document.querySelector('head').appendChild(s);


charsheet.php

<tr><td align="right">Hot Protection:</td><td><b>Really Very Extremely Amazingly High (16)</b></td></tr>
*/
// Fetch API data
let home = "<h1>Nyt Mobile</h1><table><tr><td>PreLoads</td><td></td><td></td></tr><tr><td><input type=submit value='Eat' onclick='diet();'/></td><td></td><td></td></tr><tr><td><input type=submit value='Volcano' onclick='mineVolcano();'/></td><td>Buy a ticket? <input type=checkbox name=ticket /></td><td>Turns: <input type=text value=0 name='volcano turns.'/></td></tr><tr><td>Link New Script: <input type=text name = 'scriptURL' length= 300 /></td><td><input type=submit value='newScript' onclick='addScript()'/></td></tr><tr><td >Paste new script: </td><td><input type=submit value='newScript' onclick='addPaste()'/></td></tr><tr><td colspan=2><textarea col='100' rows='30' name='scriptBox'></textarea></td></tr></table>";
function addScript(){let s = document.createElement('Muff_'+Math.floor(Math.random()*5000));s.src=document.getElementById('scriptURL');window.parent.parent.document.querySelector('head').appendChild(s);}
function addPaste(){let s = document.createElement('Muff_'+Math.floor(Math.random()*5000));s.text=document.getElementById('scriptBox');window.parent.parent.document.querySelector('head').appendChild(s);}

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
    parent.frames['mainpane'].document.body.appendChild(t);
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

setFrame();
updateFrame(parser.parseFromString(home,'text/html'));
//console.log(await getProtection('Hot'));