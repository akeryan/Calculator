let number1 = ''
let number2 = ''
let operator = ''

const digitButtons = document.querySelectorAll('.btn')
const displayStatusEl = document.getElementById('display-status')
const displayMainEl = document.getElementById('display-main')

digitButtons.forEach( button => {
    button.addEventListener( 'click', event => {
        fillExpression( event.target.textContent )
    });
});

function fillExpression( input ) {
    if( input === 'C' ) {
        number1 = ''
        number2 = ''
        operator = ''
        displayStatusEl.textContent = '0'
    } else if( '+-*/'.includes( input ) ) {
        operator = input
        displayStatusEl.textContent += input
    } else if( input === '=' ) {
        let result = operate( +number1, +number2, operator )
        displayStatusEl.textContent = result
    } else if( operator === '') {
        if( displayStatusEl.textContent === '0') {
            displayStatusEl.textContent = input
        } else {
            displayStatusEl.textContent += input
        }
        number1 += input;
    } else if( operator !== '') {
        number2 += input
        displayStatusEl.textContent += input
    }
}

function add( a, b ) {
    return a + b;
}

function subtract( a, b ) {
    return a - b;
}

function multiply( a, b ) {
    return a * b;
}

function divide( a, b ) {
    return a / b;
}


function operate( num1, num2, op ) {
    switch( op ) {
        case '+': return add( num1, num2 )
        break;
        case '-': return subtract( num1, num2 )
        break;
        case '*': return multiply( num1, num2 )
        break;
        case '/': return divide( num1, num2 )
        break;
    }
}


