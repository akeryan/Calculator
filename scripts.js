let expression = []

const digitButtons = document.querySelectorAll('.btn')
const displayStatusEl = document.getElementById('display-status')
const displayMainEl = document.getElementById('display-main')

displayStatusEl.textContent = '0'

digitButtons.forEach( button => {
    button.addEventListener( 'click', event => {
        fillExpression( event.target.textContent )
    });
});

function fillExpression( input ) {
    if( input === 'C' ) { //done
        expression = []
        displayStatusEl.textContent = '0'
    } else if( '+-*/'.includes( input ) ) { //done
        if( expression.length % 2 === 0 ){
            expression[ expression.length - 1 ] = input
        } else {
            expression.push(input)
        }
        render()        
    } else if( input === '=' ) { //done
        if ( expression.length % 2 !== 0 ) {
            expression[0] = calcExpression()
            expression.splice(1)
            render()
        }
    } else { //done
        if( expression.length % 2 === 0) {
            expression.push(input)
        } else {
            expression[expression.length-1] += input
        }
        render()
    }
    
}

function calcExpression() {
    let result = expression[0]
    for( let i = 2; i < expression.length; i += 2 ) {
        result = operate( +result, +expression[i], expression[i-1])
    }
    return result
}

function render() {
    if( expression.length === 0 ) {
        displayStatusEl.textContent = '0'
    } else {
        displayStatusEl.textContent = expression.join('')
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


