function pasteImageFunc() {
    function pasteImage(e) {
        fileSelected = e.target.parentElement.querySelector("input[type=file]")
        navigator.clipboard.read().then(clipboardItems => {
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    clipboardItem.getType(type).then(blob => {
                        let file = new File([blob], "img.jpg", { type: "image/jpeg", lastModified: new Date().getTime() });
                        let container = new DataTransfer();
                        container.items.add(file);
                        fileSelected.files = container.files;
                        fileSelected.dispatchEvent(new Event('change', { 'bubbles': true }));

                        let inputPointers = document.querySelectorAll("span.input-pointer");
                        inputPointers.forEach(inputPointer => inputPointer.parentElement.removeChild(inputPointer));
                    });
                }
            }
        });
    }
    let inputs = document.querySelectorAll("input[type=file]");
    if (inputs.length > 1) {
        inputs.forEach(input => {
            var pointer = document.createElement("span");
            pointer.innerText = "Click here to paste";
            pointer.setAttribute("style", "border: solid 1px #000; color: #000; cursor: pointer;");
            pointer.className = "input-pointer";
            pointer.onclick = pasteImage;
            input.parentElement.append(pointer);
        });
        return;
    }
    else if (inputs.length == 1) {
        pasteImage(inputs[0]);
    }
}

function pasteImageListener() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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
        title: "Paste Image",
        contexts: ["all"]  // ContextType
    });
    chrome.contextMenus.onClicked.addListener(pasteImageListener);
});