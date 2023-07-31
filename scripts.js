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

document.onkeydown = event => {
    fillExpression( event.key )
};

function fillExpression( input ) {
    if( input === 'C' ) {
        expression = []
    } else if ( input === '⇦' || input === 'Backspace' ) {
        if( expression.length > 0 ) {
            let last = expression.pop()
            if( last.length > 1 ) {
                expression.push(last.slice(0, -1))
            }        
        }
    } else if( input === '+/-' ) {
        if( expression.length % 2 !== 0 ) {
            let number = +expression[ expression.length - 1 ]  
            expression[ expression.length - 1 ] = (number * (-1)).toString()
        }
    } else if( input === '.' ) {
        if( expression.length % 2 === 0 ) {
            expression.push( input )            
        } else {
            if( !expression[ expression.length - 1 ].includes('.') ) {
                expression[ expression.length - 1 ] += '.'
            }
        }
    } else if( '+-*/'.includes( input ) ) {
        isResult = false
        if( expression.length === 0 && input === '-' ) {
            expression.push( input )
        } else if ( expression.length % 2 === 0 && input !== '-') {
            expression[ expression.length - 1 ] = input
        } else if( expression[ expression.length - 1 ] === '+' && input === '-' ) {
            expression[ expression.length - 1 ] = input
        } else {
            expression.push( input )
        }      
    } else if( input === '=' || input === 'Enter' ) {
        if ( expression.length > 1 && expression.length % 2 !== 0 ) {
            expression[0] = calcExpression().toString()
            expression.splice(1)
            isResult = true
        }
    } else if( '0123456789'.includes( input ) )
    {
        if( expression.length % 2 === 0 ) {
            expression.push(input)
        } else if( isResult === true ) {
            expression[0] = input
            isResult = false
        } else {
            expression[ expression.length-1 ] += input
        }
    }
    render()    
}

function calcExpression() {
    let result = expression[0]
    for( let i = 2; i < expression.length; i += 2 ) {
        result = operate( +result, +expression[i], expression[i-1])
    }
    return Number(Math.round(result + 'e7') + "e-7")
}

function render() {
    let exprStr = expression.join('')
    displayLiveEl.style.fontSize = calcDisplayLiveFontSize( exprStr )

    if( exprStr.length === 0 ) {
        displayLiveEl.textContent = '0'
        displayResultEl.textContent = ''
    } else {
        displayLiveEl.textContent = exprStr
    }

    if( expression.length >= 3 ) {
        let result = calcExpression()
        if( isNaN(result) ) {
            displayResultEl.textContent = ''
        } else {
            displayResultEl.textContent = result
        }
    } else {
        displayResultEl.textContent = ''
    }
}

function calcDisplayLiveFontSize( str ) {
    let strLen = str.length
    switch( true ) {
        case strLen <= 7: 
            return '60px';
        case strLen > 14: 
            return '31px';
        case strLen > 13: 
            return '32px';
        case strLen > 12: 
            return '35px';
        case strLen > 11: 
            return '38px';
        case strLen > 10: 
            return '41px';  
        case strLen > 9:
            return '45px';  
        case strLen > 8: 
            return '50px';  
        case strLen > 7:
            return '55px';          
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


