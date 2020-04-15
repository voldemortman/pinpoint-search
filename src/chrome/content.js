chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.greeting === 'hello') {
    console.log('greeted hello'); // eslint-disable-line no-console
    sendResponse({ farewell: 'goodbye' });
  }
});
