(function() {
  console.log("content script");
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.command == "pasteBin"){
      var element = document.querySelector(request.bin.fieldId);
      if (element) {
        element.value = request.bin.contents;
        sendResponse({ result: 1 });
      }
      else {
        sendResponse({ result: 0 });
      }
    }
    else {
      sendResponse({}); // Send nothing..
    }
  });
})();
