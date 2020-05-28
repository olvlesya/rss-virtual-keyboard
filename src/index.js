class Keyboard {
  constructor(rows) {
    this.rows = rows;
  }

  getHtml() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    this.rows.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('keyboard__row');
      row.forEach((button) => {
        rowDiv.appendChild(button.getHtml());
      });
      keyboard.appendChild(rowDiv);
    });
    return keyboard;
  }
}

class Button {
  constructor(text, secondText) {
    this.text = text;
    this.secondText = secondText;
    this.classList = ['keyboard__key'];
  }

  addClass(cssClass) {
    this.classList.push(cssClass);
    return this;
  }

  handleMouseDown = () => {
    document.activeElement.value += this.text;
  };

  getHtml() {
    const wrapper = document.createElement('button');
    this.classList.forEach((cssClass) => {
      wrapper.classList.add(cssClass);
    });
    const span = document.createElement('span');
    span.textContent = this.text;
    if (this.secondText) {
      const sup = document.createElement('sup');
      sup.textContent = this.secondText;
      wrapper.appendChild(sup);
    }
    wrapper.appendChild(span);

    document.addEventListener('keydown', (e) => {
      if (this.text.toLowerCase() === e.key.toLowerCase()) {
        wrapper.classList.add('keyboard__key_active');
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.text.toLowerCase() === e.key.toLowerCase()) {
        wrapper.classList.remove('keyboard__key_active');
      }
    });
    wrapper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      wrapper.classList.add('keyboard__key_active');
      this.handleMouseDown(wrapper);
    });
    wrapper.addEventListener('mouseup', (e) => {
      e.preventDefault();
      wrapper.classList.remove('keyboard__key_active');
    });
    return wrapper;
  }
}

class Backspace extends Button {
  constructor() {
    super('backspace');
  }

  handleMouseDown = () => {
    const { selectionStart, selectionEnd, value } = document.activeElement;
    if (selectionStart === 0) {
      return;
    }
    const valueArr = value.split('');
    if (selectionStart === selectionEnd) {
      valueArr.splice(selectionStart - 1, 1);
      document.activeElement.value = valueArr.join('');
      const newSectionStart = selectionStart - 1;
      document.activeElement.selectionStart =
        newSectionStart < 0 ? 0 : newSectionStart;
    } else {
      valueArr.splice(selectionStart, selectionEnd - selectionStart);
      document.activeElement.value = valueArr.join('');
      document.activeElement.selectionStart = selectionStart;
    }
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
  };
}

class Delete extends Button {
  constructor() {
    super('Del');
  }

  handleMouseDown = () => {
    const { selectionStart, selectionEnd, value } = document.activeElement;
    if (selectionEnd === value.length) {
      return;
    }
    const valueArr = value.split('');
    if (selectionStart === selectionEnd) {
      valueArr.splice(selectionStart, 1);
    } else {
      valueArr.splice(selectionStart, selectionEnd - selectionStart);
    }
    document.activeElement.value = valueArr.join('');
    document.activeElement.selectionStart = selectionStart;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
  };
}

class Enter extends Button {
  constructor() {
    super('Enter');
  }
  handleMouseDown = () => {
    document.activeElement.value += '\n';
  };
}

class ArrowLeft extends Button {
  constructor() {
    super('←');
  }
  handleMouseDown = () => {
    const { selectionStart } = document.activeElement;
    const newSectionStart = selectionStart - 1;
    document.activeElement.selectionStart =
      newSectionStart < 0 ? 0 : newSectionStart;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
  };
}

class ArrowRight extends Button {
  constructor() {
    super('→');
  }
  handleMouseDown = () => {
    const { selectionStart } = document.activeElement;
    const newSectionStart = selectionStart + 1;
    document.activeElement.selectionStart =
      newSectionStart < 0 ? 0 : newSectionStart;
    document.activeElement.selectionEnd = document.activeElement.selectionStart;
  };
}

const keyboard = new Keyboard([
  [
    new Button('`', '~'),
    new Button('1', '!'),
    new Button('2', '@'),
    new Button('3', '#'),
    new Button('4', '$'),
    new Button('5', '%'),
    new Button('6', '^'),
    new Button('7', '&'),
    new Button('8', '*'),
    new Button('9', '('),
    new Button('0', ')'),
    new Button('-', '_'),
    new Button('=', '+'),
    new Backspace(),
  ],
  [
    new Button('Tab'),
    new Button('Q'),
    new Button('W'),
    new Button('E'),
    new Button('R'),
    new Button('T'),
    new Button('Y'),
    new Button('U'),
    new Button('I'),
    new Button('O'),
    new Button('P'),
    new Button('['),
    new Button(']'),
    new Button('\\'),
    new Delete(),
  ],
  [
    new Button('Caps Lock'),
    new Button('A'),
    new Button('S'),
    new Button('D'),
    new Button('F'),
    new Button('G'),
    new Button('H'),
    new Button('J'),
    new Button('K'),
    new Button('L'),
    new Button(';'),
    new Button('.'),
    new Enter(),
  ],
  [
    new Button('Shift').addClass('keyboard__key-shift'),
    new Button('\\'),
    new Button('Z'),
    new Button('X'),
    new Button('C'),
    new Button('V'),
    new Button('B'),
    new Button('N'),
    new Button('M'),
    new Button('.'),
    new Button(','),
    new Button('/'),
    new Button('↑'),
    new Button('Shift').addClass('keyboard__key-shift'),
  ],
  [
    new Button('Ctrl'),
    new Button('Win'),
    new Button('Alt'),
    new Button(' ').addClass('keyboard__key-space'),
    new Button('Alt'),
    new Button('Ctrl'),
    new ArrowLeft(),
    new Button('↓'),
    new ArrowRight(),
  ],
]);

const field = document.createElement('textarea');
field.setAttribute('autofocus', 'autofocus');
field.classList.add('input');

document.body.appendChild(field);
document.body.appendChild(keyboard.getHtml());
