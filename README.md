# Mobile-Utility-for-Farming-Scripts
A script to help automate Kingdom of Loathing on mobile devices. 

### Step 1:

  Load a chat macro like the one below. Note that this macro is too long to paste into the chat directly, so you will need to add it to your saved macros (options -> chat -> manage your chat macros):

```
/goto javascript:let s = document.createElement(\'script\');s.src=\'https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muffs.js\';window.parent.parent.document.querySelector(\'head\').appendChild(s);
```

Tested on: Android/Chrome / FF / Iphone(Safari) / IE(+mafia)


### Step 2:

  On mobile be sure to click the close chat window (the message button) instead of the main map button. 
  Load in the sample Volcano miner script in the addScriptUrl button.
  
  Sample script to load by URL:
  https://newitan.github.io/Mobile-Utility-for-Farming-Scripts/muff_volcano.js


### Bonus 
If you need to return to the home page to load the script again, for now please use the chat command: /goto javascript:window.parent.goHome(); some users may need to use /goto javascript:window.parent.parent.goHome();

If you are in an infinite loop, refresh the page to clear the scripts. 

