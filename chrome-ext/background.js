'use strict';

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url);
  var data = JSON.stringify({
  "url": tab.url
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://temp-chrome-ext-server-xzmjibnxyh.now.sh/chrome");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "54b85cb4-bc9a-e529-a772-8cff7826ec4e");

  xhr.send(data);
});
