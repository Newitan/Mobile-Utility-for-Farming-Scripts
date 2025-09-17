# Mobile-Utility-for-Farming-Scripts
A script to help automate Kingdom of Loathing on mobile devices. 

Step 1:

load a chat macro like the one below. Note this macro is too long to paste into the chat directly you will need to add it to your saved macros:

Android/Chrome / FF

/goto javascript:let s = document.createElement(\'script\');s.src=\'https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muffs.js\';window.parent.parent.document.querySelector(\'head\').appendChild(s);


Iphone/ Safari
/goto javascript:let s = document.createElement(\'script\');s.src=\'https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muffs.js/';window.parent.parent.document.querySelector(/'head/').appendChild(s);


Step 2:
  On mobile be sure to click the close chat window (the message button) instead of the main map button. 
  Load in the sample Volcano miner script in the addScriptUrl button.
  
  Sample script to load by URL:
  https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muff_volcano.js



Bonus 
If you need to return to the home page for now I use /goto javascript:window.parent.goHome(); some users may need to use /goto javascript:window.parent.parent.goHome();


