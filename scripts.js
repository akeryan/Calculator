let number1 = ''
let number2 = ''
let operator = ''
const digitButtons = document.querySelectorAll('.btn')

digitButtons.forEach( button => {
    button.addEventListener( 'click', event => {
        fillExpression( event.target.textContent )
    });
});

function fillExpression( input ) {
    if( '+-*/'.includes( input ) ) {
        operator = input
        console.log(`operator: ${operator}`)
    } else if( input === '=' ) {
        console.log(`result = ${operate( +number1, +number2, operator )}`)
    } else if( operator === '') {
        number1 += input
        console.log(`number1: ${number1}`)
    } else if( operator !== '') {
        number2 += input
        console.log(`number2: ${number2}`)
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


