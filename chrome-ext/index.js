/*
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    sendUrlToDocbot(url, callback);
  });
}

function sendUrlToDocbot(url, callback) {
  var data = "url="+url;
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      callback();
    }
  });

  xhr.open("POST", "http://ec2-54-165-205-21.compute-1.amazonaws.com/alchemy/analyze");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded; charset=UTF-8");

  xhr.send(data);
}

function renderStatus(statusText) {
  $('#topStatus').fadeOut();
  $('#bottomStatus').html(statusText).fadeIn();
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    setTimeout(function(){
      renderStatus('...thank you for your kindness.');
    }, 1000);
  });
});

