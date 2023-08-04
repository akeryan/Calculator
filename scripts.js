const maxValue = 99999999999999
const minValue = -99999999999999

let expr = [] //stores the chain of entered numbers and operations
let isResult = false //tracks whether the '=' was hit and now we are dealnig with new expr

const digitButtons = document.querySelectorAll('.btn')
const displayLiveEl = document.getElementById('display-live')
const displayResultEl = document.getElementById('display-result')

displayLiveEl.textContent = '0'

digitButtons.forEach( button => {
    button.addEventListener( 'click', event => 
        fillExpression( event.target.textContent ))
});

document.onkeydown = event => {
    event.preventDefault()
    fillExpression( event.key )
}

function fillExpression( input ) {
    switch( true ) {
        case ['AC', 'Escape'].includes( input ): expr = []
        break;
        case ['⇦', 'Backspace'].includes( input ): inputBackspace( input )
        break;
        case input === '+/-': inputSign( input )
        break;
        case input === '.': inputDot( input )
        break;
        case '+-*/'.includes( input ): inputOperation( input )
        break;
        case ['=', 'Enter'].includes( input ): inputEnter( input )
        break;
        case '0123456789'.includes( input ): inputDigit(input)            
        break;     
        case input === '%': inputPercentage( input ) 
        break;
        default: break;  
    }
    render()
}

function inputPercentage( input ) {    
    if( expr.length % 2 !== 0 ) {
        if( expr[ expr.length - 1 ].length > 0 && !expr[ expr.length - 1].includes('%') ) {
            expr[ expr.length -1 ] += input
        }
    }
    console.log(expr)
}

function inputDigit( input ) { // 0,1,2,3,4,5,6,7,8,9
    if( expr.length % 2 === 0 ) {
        expr.push(input)
    } else if( isResult === true ) {
        expr[0] = input
        isResult = false
    } else {
        let temp = expr[ expr.length-1 ] + input
        if( minValue <= temp && temp <= maxValue ) {
            expr[ expr.length-1 ] = temp
        }
    }
}

function inputBackspace( input ) {
    if( expr.length > 0 ) {
        let last = expr.pop()
        if( last.length > 1 ) {
            expr.push(last.slice(0, -1))
        }        
    }
}

function inputSign( input ) { //   +/-
    if( expr.length % 2 !== 0 ) {
        let number = +expr[ expr.length - 1 ]  
        expr[ expr.length - 1 ] = (number * (-1)).toString()
    }
}

function inputDot( input ) {
    if( expr.length % 2 === 0 ) {
        expr.push( input )            
    } else {
        if( !expr[ expr.length - 1 ].includes('.') ) {
            expr[ expr.length - 1 ] += '.'
        }
    }
}

function inputOperation( input ) { //+,-,*,/
    isResult = false
    if( expr.length > 0 && expr.length % 2 === 0 ) {
        expr[ expr.length - 1 ] = input 
    } 
    else if( expr.length > 0 ) {
        expr.push( input )
    } 
}

function inputEnter( input ) {
    if( expr.length > 1 && expr.length % 2 !== 0 ) {
        expr[0] = calcExpression().toString()
        expr.splice(1)
        isResult = true
    }
}

function calcExpression() {
    let result = 0;
    if( expr[ 0 ].includes( '%' ) ) {
        result = +(expr[ 0 ].slice(0, -1)) / 100        
    } else {
        result = expr[0]
    }

    for( let i = 2; i < expr.length; i += 2 ) {
        if( expr[ i ].includes( '%' ) ) {
            result = operate( +result, +(expr[i].slice(0, -1)), '%', expr[i-1] )                        
        } else {
            result = operate( +result, +expr[i], expr[i-1] )
        }
    }
    return Number(Math.round(result + 'e7') + "e-7")
}

function render() {
    let exprStr = expr.join('')
    displayLiveEl.style.fontSize = calcDisplayLiveFontSize( exprStr )

    if( exprStr.length === 0 ) {
        displayLiveEl.textContent = '0'
        displayResultEl.textContent = ''
    } else {
        displayLiveEl.textContent = addCommasToExpr()
    }

    if( expr.length >= 1 ) {
        let result = calcExpression()
        if( isNaN(result) ) {
            displayResultEl.textContent = 'NaN'
        } else {
            if( result.toFixed().length > 10) {
                displayResultEl.textContent = result.toExponential(2)
            } else {
                displayResultEl.textContent = result.toLocaleString()
            }
        }
    } else {
        displayResultEl.textContent = ''
    }
}

//Formats numbers of the expr with commas
function addCommasToExpr() {
    let tempExpr = expr.map((x) => x)
    for( let i = 0; i < tempExpr.length; i += 2 ) {
        if( tempExpr[i].includes('%') ) {
            tempExpr[i] = (+tempExpr[i].slice( 0, -1 )).toLocaleString() + '%'        
        } else {
            tempExpr[i] = (+tempExpr[i]).toLocaleString()
        }
    }
    return tempExpr.join('')
}

function calcDisplayLiveFontSize( str ) {
    let strLen = str.length
    switch( true ) {
        case strLen <= 7: return '60px';
        case strLen > 14: return '31px';
        case strLen > 13: return '32px';
        case strLen > 12: return '35px';
        case strLen > 11: return '38px';
        case strLen > 10: return '41px';  
        case strLen > 9:  return '45px';  
        case strLen > 8:  return '50px';  
        case strLen > 7:  return '55px';          
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

function percentage( n1, n2, op ) {
    switch( op ) {
        case '+': return n1 + ( n1 * n2 / 100 )
        case '-': return n1 - ( n1 * n2 / 100 )
        case '*': return n1 * n2 / 100
        case '/': return n1 / ( n2 / 100 )
        default: break 
    }
}


function operate( num1, num2, operation, op ) {
    switch( operation ) {
        case '+': return add( num1, num2 )
        case '-': return subtract( num1, num2 )
        case '*': return multiply( num1, num2 )
        case '/': return divide( num1, num2 )
        case '%': return percentage( num1, num2, op)
    }
}


