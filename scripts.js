const maxValue = 99999999999999
const minValue = -99999999999999

let expression = [] //stores the chain of entered numbers and operations
let isResult = false //tracks whether the '=' was hit and now we are dealnig with new expression

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

const exprLen = () => expression.length

function fillExpression( input ) {
    switch( true ) {
        case ['AC', 'Escape'].includes( input ): expression = []
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
        default: break;  
    }
    render()
}

function inputDigit( input ) { // 0,1,2,3,4,5,6,7,8,9
    if( exprLen() % 2 === 0 ) {
        expression.push(input)
    } else if( isResult === true ) {
        expression[0] = input
        isResult = false
    } else {
        let temp = expression[ exprLen()-1 ] + input
        if( minValue <= temp && temp <= maxValue ) {
            expression[ exprLen()-1 ] = temp
        }
    }
}

function inputBackspace( input ) {
    if( exprLen() > 0 ) {
        let last = expression.pop()
        if( last.length > 1 ) {
            expression.push(last.slice(0, -1))
        }        
    }
}

function inputSign( input ) { //   +/-
    if( exprLen() % 2 !== 0 ) {
        let number = +expression[ exprLen() - 1 ]  
        expression[ exprLen() - 1 ] = (number * (-1)).toString()
    }
}

function inputDot( input ) {
    if( exprLen() % 2 === 0 ) {
        expression.push( input )            
    } else {
        if( !expression[ exprLen() - 1 ].includes('.') ) {
            expression[ exprLen() - 1 ] += '.'
        }
    }
}

function inputOperation( input ) { //+,-,*,/
    isResult = false
    if( exprLen() > 0 && exprLen() % 2 === 0 ) {
        expression[ exprLen() - 1 ] = input 
    } 
    else if( exprLen() > 0 ) {
        expression.push( input )
    } 
}

function inputEnter( input ) {
    if( exprLen() > 1 && exprLen() % 2 !== 0 ) {
        expression[0] = calcExpression().toString()
        expression.splice(1)
        isResult = true
    }
}

function calcExpression() {
    let result = expression[0]
    for( let i = 2; i < exprLen(); i += 2 ) {
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
        displayLiveEl.textContent = addCommasToExpr()
    }

    if( exprLen() >= 3 ) {
        let result = calcExpression()
        if( isNaN(result) ) {
            displayResultEl.textContent = 'NaN'
        } else {
            displayResultEl.textContent = result.toLocaleString()
        }
    } else {
        displayResultEl.textContent = ''
    }
}

//Formats numbers of the expression with commas
function addCommasToExpr() {
    let tempExpr = expression.map((x) => x)
    for( let i = 0; i < tempExpr.length; i += 2 ) {
        tempExpr[i] = (+tempExpr[i]).toLocaleString()
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


function operate( num1, num2, op ) {
    switch( op ) {
        case '+': return add( num1, num2 )
        case '-': return subtract( num1, num2 )
        case '*': return multiply( num1, num2 )
        case '/': return divide( num1, num2 )
    }
}


