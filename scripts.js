let expression = [] //stores the chain of entered numbers and operations
let isResult = false //tracks whether the '=' was hit and now we are dealnig with new expression

const digitButtons = document.querySelectorAll('.btn')
const displayLiveEl = document.getElementById('display-live')
const displayResultEl = document.getElementById('display-result')

displayLiveEl.textContent = '0'

digitButtons.forEach( button => {
    button.addEventListener( 'click', event => {
        fillExpression( event.target.textContent )
    });
});

function fillExpression( input ) {
    if( input === 'C' ) {
        expression = []
        result = 0
        displayLiveEl.textContent = '0'
        displayResultEl.textContent = ''
    } else if( input === '+/-' ) {
        if( expression.length === 0 ) {
            expression.push( input )
            render()
        } else if( expression.length % 2 !== 0 ) {
            let number = +expression[ expression.length - 1 ]  
            expression[ expression.length - 1 ] = (number * (-1)).toString()
            render() 
        }
    } else if( input === '.' ) {
        if( expression.length % 2 === 0 ) {
            expression.push( input )            
            render()
        } else {
            if( !expression[ expression.length - 1 ].includes('.') ) {
                expression[ expression.length - 1 ] += '.'
                render()
            }
        }
    } else if( '+-*/'.includes( input ) ) {
        isResult = false
        if( input === '-' && expression.length === 0 ) {
            expression.push( input )
        } else if ( expression.length % 2 === 0 && input !== '-' ) {
            expression[ expression.length - 1 ] = input
        } else {
            expression.push( input )
        }
        render()        
    } else if( input === '=' ) {
        if ( expression.length > 1 && expression.length % 2 !== 0 ) {
            expression[0] = calcExpression()
            expression.splice(1)
            displayResultEl.textContent = ''
            isResult = true
            render()
        }
    } else {
        if( expression.length % 2 === 0) {
            expression.push(input)
        } else if( isResult === true ) {
            expression[0] = input
            isResult = false
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
        displayLiveEl.textContent = '0'
    } else {
        displayLiveEl.textContent = expression.join('')
    }

    if( expression.length >= 3 ) {
        let result = calcExpression()
        if( isNaN(result) ) {
            displayResultEl.textContent = ''
        } else {
            displayResultEl.textContent = result
        }
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


