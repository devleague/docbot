'use strict';

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url); 
});
