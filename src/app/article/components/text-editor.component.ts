import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: '../views/TextEditorComponent.html',
  styleUrls: ['../views/TextEditorComponent.scss']
})
export class TextEditorComponent implements OnInit {
  FormatTexts = [
    {value: false, text: 'Select Format'},
    {value: 'h1', text: 'Title 1'},
    {value: 'h2', text: 'Title 2'},
    {value: 'h3', text: 'Title 3'},
    {value: 'h4', text: 'Title 4'},
    {value: 'h5', text: 'Title 5'},
    {value: 'h6', text: 'Subtitle'},
    {value: 'hp', text: 'Paragraph'},
    {value: 'pre', text: 'Preformatted'},
  ];
  FormatFonts = [
    {value: false, text: 'Select font'},
    {value: 'Arial', text: 'Arial'},
    {value: 'Arial Black', text: 'Arial Black'},
    {value: 'Courier New', text: 'Courier New'},
    {value: 'Times New Roman', text: 'Times New Roman'},
  ];
  Format = [
    {value: '', text: ''},
    {value: '', text: ''},
    {value: '', text: ''},
    {value: '', text: ''},
    {value: '', text: ''},
  ];
  FormatSizes = [
    {value: false, text: '- size -'},
    {value: '1', text: 'Very small'},
    {value: '2', text: 'A bit small'},
    {value: '3', text: 'Normal'},
    {value: '4', text: 'Medium-large'},
    {value: '5', text: 'Big'},
    {value: '6', text: 'Very big'},
    {value: '7', text: 'Maximum'},
  ];
  FormatBackgroundColors = [
    {value: false, text: 'Select Background'},
    {value: 'rgb(255, 0, 0)', text: 'Red'},
    {value: 'rgb(0, 0, 255)', text: 'Blue'},
    {value: 'rgb(0, 128, 0)', text: 'Green'},
    {value: ' rgb(0, 0, 0)', text: 'Black'},
  ];
  FormatColors = [
    {value: false, text: 'Select Color'},
    {value: '#ff0000', text: 'Red'},
    {value: '#0000ff', text: 'Blue'},
    {value: '#008000', text: 'Green'},
    {value: '#000000', text: 'Black'},
  ];

  textSelected: string;
  fontSelected: string;
  sizeSelected: string;
  colorSelected: string;
  backgroundSelected: string;
  range: Range;
  text = '<p>Lorem ipsum</p>';
  @ViewChild('textBox', {static: false}) oDoc: ElementRef;
  @ViewChild('switchMode', {static: false}) switchMode: ElementRef;
  @Output() change = new EventEmitter<string>();
  sDefTxt: any;
  currentNodeHTML: any;

  constructor() {
  }

  ngOnInit() {
    this.initDoc();
  }

  initDoc() {
    this.sDefTxt = this.oDoc.nativeElement.innerHTML;
    if (this.switchMode.nativeElement.checked) {
      this.setDocMode();
    }
    this.oDoc.nativeElement.addEventListener('click', this.idNode);
  }

  onBlurChange() {
    this.change.emit(this.text);
  }

  changeValueText() {
    this.change.emit(this.sDefTxt);
  }

  getCurrentTagName = () => {
    const tag = this.currentNodeHTML.tagName === 'LI' ? this.currentNodeHTML.parentNode.tagName : this.currentNodeHTML.tagName;
    return tag;
  }

  getStyleValue = (styleName) => {
    if (!this.currentNodeHTML) {
      return '';
    } else {
      const a = this.bruceforceStyleValue(styleName, this.currentNodeHTML);
      return a;
    }
  }

  hasStyle = (att, value) => {
    const classes = 'active';
    if (!this.currentNodeHTML) {
      return '';
    } else {
      const a = this.bruceforceStyleValue(att, this.currentNodeHTML);
      return a === value && classes;
    }
  }

  hasTagName = (tagName) => {
    if (!tagName) {
      return;
    }
    const classes = 'active';
    if (!this.currentNodeHTML) {
      return '';
    } else {
      return this.bruceforceTagName(tagName, this.currentNodeHTML) ? '' : classes;
    }
  }

  getAttributeValue = (attName) => {
    if (!this.currentNodeHTML) {
      return '';
    } else {
      const a = this.bruceforceAttribute(attName, this.currentNodeHTML);
      return a;
    }
  }
  bruceforceAttribute = (attr, currentNode) => {
    const currentValue = currentNode.getAttribute(attr);
    if (currentNode.tagName && currentNode.tagName === 'DIV' || !currentValue) {
      return false;
    } else if (currentValue) {
      return currentValue;
    } else {
      return this.bruceforceAttribute(attr, currentNode.parentNode);
    }
  }

  bruceforceStyleValue = (attr, currentNode) => {
    const currentValue = currentNode.style[attr];
    if (currentNode.tagName && currentNode.tagName === 'DIV' || !currentValue) {
      return false;
    } else if (currentValue) {
      return currentValue;
    } else {
      return this.bruceforceStyleValue(attr, currentNode.parentNode);
    }
  }

  bruceforceTagName = (tagName, currentNode) => {
    if (currentNode.tagName === 'DIV') {
      return false;
    } else if (currentNode.tagName === tagName) {
      return true;
    } else {
      return this.bruceforceTagName(tagName, currentNode.parentNode);
    }
  }

  idNode = (e) => {
    this.currentNodeHTML = e.target;
    return e;
  }

  addHyperLink = () => {
    const sLnk = prompt('Write the URL here', 'http:\/\/');
    if (sLnk && sLnk !== '' && sLnk !== 'http://') {
      this.formatDoc('createlink', sLnk);
    }
  }

  convertToHTML = (item) => {
    return `<p class="${item.value}">${item.text}</p>`;
  }

  formatDoc(sCmd, sValue) {
    if (this.validateMode()) {
      document.execCommand(sCmd, false, sValue);
      this.oDoc.nativeElement.focus();
    }
  }

  validateMode() {
    if (!this.switchMode.nativeElement.checked) {
      return true;
    }
    alert('Uncheck "Show HTML".');
    this.oDoc.nativeElement.focus();
    return false;
  }

  setDocMode() {
    const bToSource = this.switchMode.nativeElement.checked;
    let oContent;
    if (bToSource) {
      oContent = document.createTextNode(this.oDoc.nativeElement.innerHTML);
      this.oDoc.nativeElement.innerHTML = '';
      const oPre = document.createElement('div');
      this.oDoc.nativeElement.contentEditable = false;
      oPre.id = 'sourceText';
      oPre.contentEditable = 'true';
      oPre.style.height = '100%';
      oPre.appendChild(oContent);
      this.oDoc.nativeElement.appendChild(oPre);
      document.execCommand('defaultParagraphSeparator', false, 'div');
    } else {
      if (document.all) {
        this.oDoc.nativeElement.innerHTML = this.oDoc.nativeElement.innerText;
      } else {
        // remove pre tag when content is empty
        oContent = document.createRange();
        oContent.selectNodeContents(this.oDoc.nativeElement.firstChild);
        this.oDoc.nativeElement.innerHTML = oContent.toString();
      }
      this.oDoc.nativeElement.contentEditable = true;
    }
    this.oDoc.nativeElement.focus();
  }

  printDoc() {
    if (!this.validateMode()) {
      return;
    }
    const oPrntWin = window.open('',
      '_blank', 'width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes'
    );
    oPrntWin.document.open();
    oPrntWin.document.write(
      '<!doctype html><html><head><title>Print<\/title><\/head><body onload="print();">' +
      this.oDoc.nativeElement.innerHTML + '<\/body><\/html>');
    oPrntWin.document.close();
  }

  // getSelectionText() {
  //   let selectedText = '';
  //   if (window.getSelection) { // all modern browsers and IE9+
  //     selectedText = window.getSelection().toString();
  //     this.oDoc.nativeElement.focus(() => this.range);
  //   }
  //   return selectedText;
  // }
}
