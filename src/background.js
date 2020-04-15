document.addEventListener('DOMContentLoaded', () => {
  let btn = document.getElementById('changeColor');
  btn.addEventListener('click', () => {
    chrome.tabs.query({active:true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: 'hello'}, (response) => {
        console.log(response.farewell);
      });
    });
  });
});

chrome.tabs.executeScript({
  file: 'src/content.js'
});