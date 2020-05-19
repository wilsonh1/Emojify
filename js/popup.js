var emojify = document.getElementById('emojify');

chrome.storage.sync.get('emojify', function(data) {
    console.log(data.emojify);
    emojify.checked = data.emojify;
});

emojify.onchange = function() {
    let value = this.checked;

    chrome.storage.sync.set({'emojify': value});

    if (value) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "init"}, function(response) {
                console.log(response.result);
            });
        });
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "reload"}, function(response) {
                console.log(response.result);
            });
        });
    }
};
