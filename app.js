const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const allClearButton = document.querySelector('[data-clear]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const convertButton = document.querySelector('[data-convert]')

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    clearEntry(){
        this.currentOperand = ''
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand ==='') return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation=prev + current
                break
            case '-':
                computation=prev - current
                break
            case 'x':
                computation=prev * current
                break
            case '÷':
                computation=prev / current
                break
            default:
                return
        }
        this.previousOperand = computation
        this.operation = undefined
        this.currentOperand=''
    }
    convertNegative(){
        if (this.currentOperand == '') return
        const current = parseFloat(this.currentOperand)
        this.currentOperand = (-1)*current
    }
    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != undefined){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand)
        }
        
    }
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationsButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
clearEntryButton.addEventListener('click', button =>{
    calculator.clearEntry()
    calculator.updateDisplay()
})
convertButton.addEventListener('click', button =>{
    calculator.convertNegative()
    calculator.updateDisplay()
})