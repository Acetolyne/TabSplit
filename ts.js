chrome.tabs.query({currentWindow: true}, function(tabs) {
	if(tabs.length > 1){
		//console.log(tabs[0].width);
                //console.log(screen.width);
		cnt = 1;
		curoff = tabs[0].width;
		while(cnt < tabs.length){
			chrome.windows.create({tabId: tabs[cnt].id, left: curoff, top: 0, height: screen.height, width: tabs[0].width}, function(window){
				chrome.windows.update(window.id, {state: "maximized"}, function(){})
			});
			curoff += tabs[cnt].width;
			cnt++;
		}
	}	
});