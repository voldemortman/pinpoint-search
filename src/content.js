chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === 'hello') {
    console.log('greeted hello');
    sendResponse({farewell: 'goodbye'});
  }
})