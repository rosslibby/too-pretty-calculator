class Calculator {
  constructor() {
    this.pressed = []
    this.result = 0
    this.equation = document.getElementById('equation')
    this.solution = document.getElementById('solution')
  }

  calculate(percent = false) {
    this.result = percent
      ? eval(this.pressed.join(' ')) / 100
      : eval(this.pressed.join(' '))
  }

  clearEquation() {
    this.pressed.splice(0, this.pressed.length)
    this.equation.innerText = ''
  }

  showEquation() {
    this.equation.innerText = this.pressed.join(' ').replaceAll('/', '÷').replaceAll('*', 'x')
  }

  clearSolution() {
    this.solution.innerText = 0
  }

  showSolution() {
    console.log(this.result)
    this.solution.innerText = this.result.toLocaleString('en-US')
  }

  appendInput(input) {
    if (!isNaN(input)) return this.appendDigits(input)

    if (!this.pressed.length || isNaN(this.pressed[this.pressed.length - 1])) return
    else this.pressed.push(input)
  }

  appendDigits(digit) {
    if (!this.pressed.length) {
      this.pressed.push(digit)

      return
    }

    const lastEntry = this.pressed[this.pressed.length - 1]

    if (digit === '.' && lastEntry[lastEntry.length - 1] === '.') return

    if (!isNaN(lastEntry) || lastEntry === '.') {
      this.pressed[this.pressed.length - 1] = lastEntry + digit
    } else {
      this.pressed.push(digit)
    }
  }

  handleClick(e) {
    const { value } = e.target

    switch(value) {
      case 'clear-all':
        this.clearEquation()
        this.clearSolution()
        break
      case 'clear-last':
        this.pressed.pop()
        this.showEquation()
        break
      case '.':
        this.appendDigits(value)
        break
      case '%':
        this.pressed.unshift('(')
        this.pressed.push(')')
        this.pressed.push('/')
        this.pressed.push('100')
        this.calculate(true)
        this.showEquation()
        this.showSolution()
        break
      case '=':
        this.calculate()
        this.showEquation()
        this.showSolution()
        break
      default:
        this.appendInput(value)
        this.showEquation()
        break
    }
  }

  init() {
    const buttons = document.querySelectorAll('button')

    for (const button of buttons) {
      button.addEventListener('click', this.handleClick.bind(this))
    }
  }
}

const app = new Calculator()

app.init()