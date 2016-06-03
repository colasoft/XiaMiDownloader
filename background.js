'use strict';

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var key = '.mp3?auth_key=';
		var current_url = details.url;
		current_url = encodeURI(current_url);
		if( -1 != current_url.indexOf(key)){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
				chrome.tabs.sendMessage(tabs[0].id, {url: current_url}, function(response) {   
					console.log(response);  }); 
			});
		}
		return details.url;
    },
    {
        urls: [
            "*://*.xiami.com/*",
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);