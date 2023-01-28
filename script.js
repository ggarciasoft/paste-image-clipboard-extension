function doStuffWithDOM() {
    var btnArchives = document.querySelectorAll("button[aria-label^='Archivados']");
    btnArchives[0].click();
    setTimeout(() => {
        document.querySelectorAll("span[title^='Remote Team']")[0]
            .parentElement
            .parentElement
            .parentElement
            .parentElement.click()
    }, 2000);
}

function rightClickHandler(obj) {
    console.log("Test log");
    chrome.tabs.query({ url: "https://web.whatsapp.com/" }, function (tabs) {
        var currTab = tabs[0];

        chrome.scripting.executeScript({
            target: { tabId: currTab.id },
            func: doStuffWithDOM
        });

    });
}

function pasteImageFunc() {
    let input = document.getElementsByClassName("photos-selector-input2");
    if (input.length) {
        navigator.clipboard.read().then(clipboardItems => {
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    debugger;
                    clipboardItem.getType(type).then(blob => {
                        let file = new File([blob], "img.jpg", { type: "image/jpeg", lastModified: new Date().getTime() });
                        let container = new DataTransfer();
                        container.items.add(file);
                        let fileInputElement = input[0];
                        fileInputElement.files = container.files;
                        fileInputElement.dispatchEvent(new Event('change', { 'bubbles': true }))
                    });
                }
            }
        });
    }
}

function pasteImage(obj) {
    chrome.tabs.query({ index: 0 }, function (tabs) {
        var currTab = tabs[0];

        chrome.scripting.executeScript({
            target: { tabId: currTab.id },
            func: pasteImageFunc
        });

    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "1",
        title: "Bitly Short Link",
        contexts: ["all"]  // ContextType
    });
    chrome.contextMenus.onClicked.addListener(pasteImage);
});