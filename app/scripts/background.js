'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: 'Sir Pastes Alot' });
//# sourceMappingURL=background.js.map
