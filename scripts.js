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
    if( input === '⇦' ) {
        if( operator === '' ) {
            number1 = number1.slice( 0, -1 )
        } else {
            if( number2 === '' ) {
                operator = ''
            } else {
                number2 = number2.slice( 0, -1 )
            }
        }

        if( number1 === '' ) {
            displayStatusEl.textContent = '0'
        } else {
            displayStatusEl.textContent = displayStatusEl.textContent.slice( 0, -1 )
        }
    } else if( input === 'C' ) {
        number1 = ''
        number2 = ''
        operator = ''
        displayStatusEl.textContent = '0'
    } else if( '+-*/'.includes( input ) ) {
        if( number1 !== ''){
            operator = input
            displayStatusEl.textContent += input
        }
    } else if( input === '=' ) {
        if ( number2 !== '' ) {
            displayStatusEl.textContent = operate( +number1, +number2, operator )
        }
    } else if( operator === '') {
        number1 += input
        if( displayStatusEl.textContent === '0') {
            displayStatusEl.textContent = input
        } else {
            displayStatusEl.textContent += input
        }
    } else {
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


