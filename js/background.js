chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.messenger.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.facebook.com/messages'},
        }),
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
