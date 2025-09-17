//https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muff_volcano.js
// mineVolcano function

window.parent.runLoader({name:'70svolcano',src:'https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muff_volcano.js',com:'mineVolcano()',options:['turns']});

async function mineVolcano(turns) {
  await reapi();
  if (!api) {
    console.error('Failed to load API data');
    return;
  }

  let access = api.coolitems && api.coolitems.split(',').includes('airport4');
  console.log("Volcano Access: " + access);

  if (!access) {
     let msg = "No access to volcano";
    console.log(msg);
    return msg;
  }

  if(await getProtection('Hot')<15){
    let msg = "No hot Porection";
    console.log(msg);
    return msg;
  }

  // Equip mining gear (assuming item ID 8422 is the HTMD)
  if (parseInt(api.equipment.weapon) !== 8422) {
    await visit('inv_equip.php', 'which=2&action=equip&whichitem=8422', true);
  }
  const startTurns = api.adventures;
  let currentTurns = api.adventures;
  const startTime = Date.now();
  const startGold = inv[8424];
  // Mining loop
  let mineLoop = async () => {
    let turnCheck = api.adventures - currentTurns;
    if(turnCheck!=0){turns-=turnCheck; currentTurns=api.adventures;}
    if (turns <= 0) return;
  // Heal if HP low
  if (api.hp < 50) {
    await visit('runskillz.php', 'action=Skillz&whichskill=3012&quantity=1&targetplayer=' + api.playerid, true);
  }

    console.log('Starting mining turn');
    let page = await visit('adventure.php', 'adv=449');
    if (!page) {
      console.error('Failed to load mine page');
      return;
    }

    let mine = parser.parseFromString(page, 'text/html');
    let promising = [];
    let shale = mine.getElementById('postload');
    if (!shale) {
      console.error('Could not find mine data');
      return;
    }

    let tiles = shale.querySelectorAll('td');
    tiles[tiles.length - 1] = ''; // Remove last tile?

    for (let t of tiles) {
      let img = t.querySelector('img');
      if (!img) continue;
      let info = img.alt.toLowerCase().split('(');
      if (info.length > 1) {
        let data = [info[0], info[1].split(',')];
        if (data[1].length > 1) {
          data[1][1] = parseInt(data[1][1]);
          if (data[0].includes('promising') && data[1][1] > 4) {
            let link = t.querySelector('a');
            if (link) {
              let l = link.href.split('0/')[1] || link.href;
              promising.push({ r: data[1][0], c: data[1][1], l: l });
            }
          }
        }
      }
    }

    if (promising.length > 0) {
      promising.sort((a, b) => b.c - a.c);
      for (let tile of promising) {
        console.log('Mining promising tile:', tile);
        let page2 = await visit(tile.l, '');
        
        if (page2.includes('goldnugget.gif')) {
          console.log("Gold found!");
          // Optionally reset mine
          await visit('mining.php', 'reset=1&mine=6', true);
          break;
        }
        if (turns <= 0) break;
      }
    } else {
      console.log("No promising chunks found");
      if (page.includes('Find New Cavern')) {
        await visit('mining.php', 'reset=1&mine=6', true);
      } else {
        await visit('mining.php', 'mine=6&which=51', true);
        
      }
    }

    // Continue loop with delay to avoid rate limiting
    if (turns > 0) {
      setTimeout(mineLoop, 500);
    }else {
     
   let finalTurns = startTurns - api.adventures;
      let finalGold = inv[8424] - startGold;
      let finalTime = (Date.now() -startTime)/1000;
      let msg = "<h2>Volcano Mining completed:</h2>";
      msg+="<br />Adventures used: "+finalTurns;
      msg+="<br />Gold gained: "+finalGold;
      msg+="<br />Time Spent: "+finalTime+" seconds.";
      msg+="<br /> <a href='javascript:this.parent.goHome();'>Home</a>";
      setFrame(msg);
      console.log(startTurns+" "+startGold+" "+startTime);
      console.log(api.adventures+" "+inv[8424]+" "+Date.now());
      console.log(finalTurns+" "+finalGold+" "+finalTime);
      
      console.log("Volcano Mining completed.");


    }
  };

  mineLoop();


}

// Example usage
//mineVolcano(3);
