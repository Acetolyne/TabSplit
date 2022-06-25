chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({size: 'maximized'}, function() {
    console.log("TabSplit successfully installed");
  });
});
// if(chrome.runtime.lastError) {
    ////Something went wrong
    // console.warn("Whoops.. " + chrome.runtime.lastError.message);
  // } else {
chrome.runtime.onStartup.addListener(function() {
	chrome.windows.getCurrent({}, function(window){
		chrome.storage.local.get(['size'], function(result){
		if( typeof result.size == 'undefined'){
		  result.size = 'maximized';
		}
		chrome.windows.update(window.id, {top: 0, left: 0}, function(window){
			chrome.windows.update(window.id, {state: result.size}, function(window){
				chrome.windows.getAll(null, function(w){
					finwin = w[w.length -1].id;
					console.log("FINWIN INITIAL" + finwin);
					console.log("X:" + w[w.length -1].width);
					offset = 1 + w[w.length -1].width
					chrome.tabs.query({windowId: finwin}, function(tabs) {
						console.log("L:" + tabs.length);
						if(tabs.length > 1){
							cnt = 1;
							console.log(offset);
							//curoff = tabs[0].width;
			/////

			/////
							while(cnt < tabs.length){
							console.log("CNT:" + cnt);
							console.log(tabs[cnt].id);
							console.log(tabs[cnt]);
							console.log("o:" + offset);
							chrome.windows.create({tabId: tabs[cnt].id, left: offset, top: 0}, function(window){
								if(window) {
									chrome.windows.update(window.id, {state: result.size}, function(w){
										//chrome.tabs.get(tabs[cnt].id, function(tab){
											//console.log("YO");
											//console.log(tab);
											//offset += tab.width;
										//});
									});	
									
								} else {
									console.log("We have an error creating window");
									chrome.windows.getAll(null, function(w){
										console.log("CURWINS" + w[w.length -1].left);
										chrome.tabs.query({windowId: w[0].id}, function(tabs) {
											console.log("TABSEXTRA:" + tabs);
											for( i=1;i < tabs.length; i++ ) {
												chrome.tabs.move(tabs[i].id, {index: -1, windowId: finwin }, function(){
												});
											}
										});
									});					
								}
								//console.log("WWWWW:" + window);
							
							
							});
							offset += tabs[cnt].width;
							chrome.windows.getAll(null, function(w){
								console.log("WINSALL:" + w);
								finwin = w[w.length -1].id;
							});
							cnt++;
						};	
					};
				});
			});
		});
	});
	});
	});
});