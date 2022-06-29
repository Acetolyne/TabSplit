chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.local.set({ size: 'maximized' }, function () {
		console.log("TabSplit successfully installed");
	});
});
chrome.runtime.onStartup.addListener(function () {
	chrome.windows.getCurrent({}, function (window) {
		chrome.storage.local.get(['size'], function (result) {
			if (typeof result.size == 'undefined') {
				result.size = 'maximized';
			}
			chrome.windows.update(window.id, { top: 0, left: 0 }, function (window) {
				chrome.windows.update(window.id, { state: result.size }, function (window) {
					chrome.windows.getAll(null, function (w) {
						finwin = w[w.length - 1].id;
						offset = 1 + w[w.length - 1].width
						chrome.tabs.query({ windowId: finwin }, function (tabs) {
							if (tabs.length > 1) {
								cnt = 1;
								while (cnt < tabs.length) {
									chrome.windows.create({ tabId: tabs[cnt].id, left: offset, top: 0 }, function (window) {
										if(chrome.runtime.lastError){
											console.warn("No more monitors available, adding tab to last window");
										}
										if (window) {
											chrome.windows.update(window.id, { state: result.size }, function (w) { });
										} else {
											chrome.windows.getAll(null, function (w) {
												chrome.tabs.query({ windowId: w[0].id }, function (tabs) {
													for (i = 1; i < tabs.length; i++) {
														chrome.tabs.move(tabs[i].id, { index: -1, windowId: finwin }, function () {
														});
													}
												});
											});
										}
									});
									offset += tabs[cnt].width;
									chrome.windows.getAll(null, function (w) {
										finwin = w[w.length - 1].id;
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