chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({size: 'fullscreen'}, function() {
    console.log("TabSplit successfully installed");
  });
});
chrome.windows.getCurrent({}, function(window){
  chrome.storage.sync.get(['size'], function(result){
    chrome.windows.update(window.id, {state: result.size}, function(){})
  });
});
chrome.tabs.query({currentWindow: true}, function(tabs) {
  if(tabs.length > 1){
    cnt = 1;
    curoff = tabs[0].width;
    while(cnt < tabs.length){
      chrome.windows.create({tabId: tabs[cnt].id, left: curoff, top: 0, height: screen.height, width: tabs[0].width}, function(window){
        chrome.storage.sync.get(['size'], function(result){
          chrome.windows.update(window.id, {state: result.size}, function(){})
        });
      });
      curoff += tabs[cnt].width;
      cnt++;
    }
  }	
});