var down_history = '';  

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	var name_dom = document.getElementById("J_trackName");
    name_dom = name_dom.innerHTML;
	if( -1 == down_history.indexOf(name_dom) ){
		down_history = down_history + name_dom + '.';
		console.log(down_history);
		var song_name = name_dom + ".mp3";
		console.log(song_name);
		console.log(request.url);
	
		window.URL = window.URL || window.webkitURL;
		var xhr = new XMLHttpRequest(),
		a = document.createElement('a'), file;

		xhr.open('GET', request.url, true);
		xhr.responseType = 'blob';
		xhr.onload = function () {
			file = new Blob([xhr.response], { type : 'application/octet-stream' });
			a.href = window.URL.createObjectURL(file);
			a.download = song_name; 
			a.click();
		};
		xhr.send();
	}

  });