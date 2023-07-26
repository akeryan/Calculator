let number1, number2, operator

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
        case '+': add( num1, num2 )
        break;
        case '-': subtract( num1, num2 )
        break;
        case '*': multiply( num1, num2 )
        break;
        case '/': divide( num1, num2 )
        break;
    }
}


