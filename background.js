// Add a listener to receive messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getClickedElement") {
        navigator.clipboard.read().then(clipboardItems => {
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    clipboardItem.getType(type).then(blob => {
                        let file = new File([blob], "img.jpg", { type: "image/jpeg", lastModified: new Date().getTime() });
                        let container = new DataTransfer();
                        container.items.add(file);
                        request.element.files = container.files;
                        request.element.dispatchEvent(new Event('change', { 'bubbles': true }))
                    });
                }
            }
        });
    }
});