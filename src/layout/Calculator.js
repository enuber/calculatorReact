import '../styles/calculator.css';
import React from 'react';
import Screen from './screen/Screen';
import Keypad from './keypad/Keypad';

class Calculator extends React.Component {

    state = {
        equation: '',
        currentNumber: '',
        currentOperator: '',
        decimalExist: false,
        operatorClicked: false,
        equalClicked: false,
        calculationMade: false,
        originalNumber: '',
        displayValue: 0
    };

    onButtonPress = async (evt) => {
        let equation = this.state.equation;
        let currentNumber = this.state.currentNumber;
        const pressedButton = evt.target.innerHTML;

        if (pressedButton === 'C') {
            return this.clear();
        } else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') {
            return this.acceptNumOrDec(pressedButton);
        } else if (['+', '-', '*', '/'].indexOf(pressedButton) !== -1) {
            return this.acceptOperator(pressedButton);
        } else if (['%'].indexOf(pressedButton) !== -1) {
            return this.precentage();
        } else if (pressedButton === '=') {
            try {
                await this.setState({equalClicked: true});
                this.doMath();
                // const evalResult = eval(equation);
                // const displayValue = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
                // this.setState({displayValue});
            } catch (error) {
                alert('Not A Valid Equation');
                return this.clear();
            }
        }  else {
            equation = equation.trim();
            equation = equation.substr(0, equation.length -1);
            currentNumber = currentNumber.trim();
            currentNumber = currentNumber.substr(0, currentNumber -1);
        }
        this.setState({
            equation,
            currentNumber
        });
    };

    acceptNumOrDec = async (input) => {
        if (this.state.calculationMade) {
            await this.clear();
        }
        if (this.state.operatorClicked) {
            if (this.state.originalNumber === '') {
                await this.setState({
                    currentNumber: '',
                    originalNumber: this.state.currentNumber,
                    operatorClicked: false,
                    displayValue: input
                });
            } else {
                await this.setState({
                    currentNumber: '',
                    operatorClicked: false,
                    displayValue: input
                });
            }
        }
        let equation = this.state.equation;
        let currentNumber = this.state.currentNumber;
        if (!this.state.decimalExist) {
            if (input === '.') {
                if (currentNumber === '') {
                    equation += '0.';
                    currentNumber += '0.'
                } else {
                    equation += input;
                    currentNumber += input;
                }
                this.setState({
                    equation,
                    currentNumber,
                    decimalExist: true,
                    displayValue: currentNumber
                })
            } else {
                equation += input;
                currentNumber += input;
                this.setState({
                    equation,
                    currentNumber,
                    displayValue: currentNumber
                })
            }
        } else if (this.state.decimalExist && !isNaN(input)) {
            equation += input;
            currentNumber += input;
            this.setState({
                equation,
                currentNumber,
                displayValue: currentNumber
            })
        }
    };

    acceptOperator = async (operator) => {
        if (this.state.calculationMade) {
            let currentNumber = this.state.displayValue;
            await this.setState({
                currentNumber,
                originalNumber: '',
                calculationMade: false
            })
        }
        if (this.state.currentNumber !== '' && this.state.originalNumber !== ''
            && this.state.currentOperator !== '') {
            this.setState({
                equalClicked: false
            });
           await this.doMath();
        }
        let equation = this.state.equation;
        if (this.state.operatorClicked) {
            equation = equation.trim();
            equation = equation.substr(0, equation.length -1);
        }
        equation += ` ${operator} `;
        this.setState({
            equation,
            currentOperator: operator,
            decimalExist: false,
            operatorClicked: true,
            calculationMade: false
        })
    };

    precentage = async () => {
        let displayValue;
        let equation = this.state.equation + '%';
        if (this.state.currentNumber !== '' || parseFloat(this.state.currentNumber) !== 0) {
            let currentNumber = this.state.currentNumber;
            if (this.state.currentOperator === '*' || this.state.currentOperator === "/" || this.state.originalNumber === '') {
                displayValue = currentNumber / 100;
            } else {
                displayValue = (currentNumber / 100) * this.state.originalNumber;
            }
        }
        if (this.state.originalNumber === '') {
            await this.setState({
                currentNumber: '',
                originalNumber: displayValue,
                equation,
                displayValue
            });
        } else {
            await this.setState({
                currentNumber: displayValue,
                equation,
                displayValue
            });
        }
    };

    doMath = async () => {
        let operator = this.state.currentOperator;
        let displayValue;
        switch (operator) {
            case '+':
                displayValue = parseFloat(this.state.originalNumber) + parseFloat(this.state.currentNumber);
                break;
            case '-':
                displayValue = this.state.originalNumber - this.state.currentNumber;
                break;
            case '*':
                displayValue = this.state.originalNumber * this.state.currentNumber;
                break;
            case '/':
                if (parseFloat(this.state.currentNumber) !== 0) {
                    let currentNumber = this.state.currentNumber || this.state.originalNumber;
                    displayValue = this.state.originalNumber/currentNumber;
                } else {
                    displayValue = "Error"
                }
                break;
            default:
                displayValue = this.state.displayValue;
                break;
        }
        if (this.state.equalClicked) {
            await this.setState({
                currentOperator: operator,
                calculationMade: true,
                originalNumber: displayValue,
                displayValue
            });
        } else {
            await this.setState({
                currentNumber: displayValue,
                currentOperator: operator,
                calculationMade: false,
                originalNumber: '',
                displayValue
            })
        }
    };

    clear = () => {
        this.setState({
            equation: '',
            currentNumber: '',
            currentOperator: '',
            decimalExist: false,
            operatorClicked: false,
            equalClicked: false,
            calculationMade: false,
            originalNumber: '',
            displayValue: 0
        })
    };

    render() {
        return (
            <main className="calculator">
                <Screen
                    equation={this.state.equation}
                    result={this.state.displayValue}
                />
                <Keypad
                    onButtonPress={this.onButtonPress}
                />
            </main>
        );
    }
}

export default Calculator;