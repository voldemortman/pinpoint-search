class ElementSelector {
  constructor() {
    this.selectedElement = null;
    this.elementsOnClick = new Map();
    this.elementsStyle = new Map();
  }

  startSearch = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      element.addEventListener('mouseenter', this.mouseEnter);
      element.addEventListener('mouseleave', this.mouseLeave);
    });
  }

  finishSearch = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach((element) => {
      element.removeEventListener('mouseenter', this.mouseEnter);
      element.removeEventListener('mouseleave', this.mouseLeave);
    });
  }

  mouseEnter = ({ target }) => {
    this.highlightElement(target);
    if (!this.elementsOnClick.get(target)) {
      this.elementsOnClick.set(target, target.onclick);
      target.onclick = () => {
        this.selectedElement = target;
        this.finishSearch();
      };
    }
  }

  mouseLeave = ({ target }) => {
    this.removeElementHighlight(target);
    if (this.elementsOnClick.get(target)) {
      target.onclick = this.elementsOnClick.get(target);
      this.elementsOnClick.delete(target);
    }
  }

  highlightElement = (element) => {
    if (!this.elementsStyle.get(element)) {
      this.elementsStyle.set(element, element.style);
      element.style.backgroundColor = '#a0c5e8';
    }
  }

  removeElementHighlight = (element) => {
    if (this.elementsStyle.get(element)) {
      element.style = this.elementsStyle.get(element);
      this.elementsStyle.delete(element);
    }
  }
}
