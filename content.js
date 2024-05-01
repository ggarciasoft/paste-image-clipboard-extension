// Add a click event listener to the document
document.addEventListener("click", function (event) {
    // Get the element that was clicked
    var clickedElement = event.target;

    // Send the clicked element data back to the background script
    chrome.runtime.sendMessage({ action: "getClickedElement", element: clickedElement.outerHTML });
});