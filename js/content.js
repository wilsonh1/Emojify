const emoji = require('node-emoji');

function formatList (list, name) {
    console.log(list);
    let s = name;
    let cnt = Math.floor(Math.random() * 5);
    while (cnt--) {
        let index = Math.floor(Math.random() * list.length);
        s += list[index];
    }
    return s;
}

function formatRandom (name) {
    let s = name;
    let cnt = Math.floor(Math.random() * 5);
    while (cnt--)
        s += emoji.random().emoji;
    return s;
}

function format (code, name) {
    return formatList([code], name);
}

function onMissing (name) {
    let lc = emoji.find(name.toLowerCase());
    if (lc)
        return formatList([lc.emoji], name);

    if (name.length < 3)
        return name;

    let elist = emoji.search(name.toLowerCase());
    if (elist[0])
        return formatList(elist.map(e => e.emoji), name);

    return formatRandom(name);
}

function emojify () {
    let list = document.querySelectorAll('span._3oh-._58nk:not(.emojified)');

    for (let m of list) {
        let text = m.textContent;
        text = text.replace(/(\w+)/g, ':$1:');
        m.textContent = emoji.emojify(text, onMissing, format);
        m.classList.add('emojified');
    }
}

function addListeners () {
    emojify();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.command == 'init')
        addListeners();
});
