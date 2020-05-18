document.getElementById('emojify').onchange = function() {
    let value = this.checked;

    if (value) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: "init"}, function(response) {
                console.log(response.result);
            });
        });
    }
};
