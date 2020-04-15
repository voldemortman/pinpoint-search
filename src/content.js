chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.greeting === 'hello') {
    console.log('greeted hello'); // eslint-disable-line no-console
    sendResponse({ farewell: 'goodbye' });
  }
});

class ElementSelector {
  constructor() {
    this.selectedElementList = null;
    this.elementsOnClick = new Map();
  }

  startSearch = () => {
    while (!this.selectedElementList) {
      const hoveredElementList = document.querySelectorAll(':hover');
      hoveredElementList.forEach((hoveredElement, _, elementList) => {
        const element = hoveredElement;
        if (!this.elementsOnClick.get(element)) {
          this.elementsOnClick.set(element, element.onclick);
          element.onclick = () => {
            this.selectedElementList = elementList;
          };
        }
      });
    }
    this.finishSearch();
  }

  finishSearch = () => {
    const elementsOnClickKeys = this.elementsOnClick.keys();
    let result = elementsOnClickKeys.next();
    while (result.done) {
      result.value.onclick = this.elementsOnClick.get(result.value);
      result = elementsOnClickKeys.next();
    }
  }
}
