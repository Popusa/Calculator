//Made by Daniel "Popusa" Youssef
//Calculator app made with vanilla js and no regex or jquery
//div elements
//miscfunc
const displayed = document.querySelector(".display");
const percentified = document.querySelector("#percent");
const negativified = document.querySelector("#negative");
const clearall = document.querySelector("#clear");
const makeitdecimal = document.querySelector("#decimal");
//number pad
const numpad = document.querySelector(".numbers");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const zero = document.querySelector("#zero");
const equal = document.querySelector("#equal");
//remove button
const removeone = document.querySelector("#delete");
//operations
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
//VARIABLES
let decimaladded = false;
let divbyzero  = false;
//CALCLOGIC OBJECT
const CalcLogic = {
    //MEMBER VARIABLES
    OperandOne: 1,
    OperandTwo: 0,
    current:"",
    total: 0,
    Operator: '',
    //METHODS
    //DoOperation handles single or multiple operations at a time by taking the current as the second operand
    //and evaluating operand one and operand two according to the current inputted operator
    DoOperation:(function(){
        if (this.Operator == '')
            return;
        else{
            this.OperandTwo = Number(this.current);
            switch (this.Operator){
                case '+':
                    this.total = CalcLogic.AddOperands();
                    break;
                case '-':
                    this.total = CalcLogic.SubtractOperands();
                    break;
                case '*':
                    this.total = CalcLogic.MultiplyOperands();
                    break;
                case '/':
                    this.total = CalcLogic.DivideOperands();
                    if (divbyzero){
                        CalcLogic.ClearEverything();
                        return;
                    }
                    else
                        break;
            }
            this.current = this.total;
            CalcLogic.UpdateDisplay();
        }
        //setting operand one to total allows multiple operations to take place without previous input being lost
        //Operator is reset, awaiting next input from user, pressing "equal" in this case will not do anything as intended
        this.OperandOne = this.total;
        this.OperandTwo = 0;
        this.Operator = '';
    }),
    //keeps a '0' in the display for user visibility and convienience. Also, it handles updating the displayed text to match the current input
    UpdateDisplay:(function(){
        if (this.current == "")
            displayed.innerText = "0";
        else
            displayed.innerText = this.current;
    }),
    //Removes last inputted number. removing last inputted operator is done by choosing another operator
    DeleteCurrent:(function(){
        let currentlengthindex = this.current.length - 1;
        if (currentlengthindex < 0)
        return;
        else if (currentlengthindex == 0){
            this.current = "";
            displayed.innerText = "0";
        }
        else{
        if (this.current[currentlengthindex] == ".")
            decimaladded = false;
        this.current = this.current.slice(0, -1);
        CalcLogic.UpdateDisplay();
        }
    }), 
    //divides by 100 to get the percentage of the value
    GetPercent:(function(){
        let temp = Number(this.current);
        temp /= 100;
        temp = temp.toFixed(5);
        this.current = temp;
        CalcLogic.UpdateDisplay();
//      console.log("percentified");
    }),
    //simply makes the current input a negative value
    //I added an if statement to make sure display will not get updated needlessly if there is no current input and this button is pressed
    SetNegative:(function(){
        if (this.current == '')
            return;
        else{
            this.current = Number(this.current * -1);
            CalcLogic.UpdateDisplay();
        }
//      console.log("negativied!");
    }),
    //complete reset of all global, and member variables. Also, handles an edge case where the user resets after dividing by zero.
    ClearEverything:(function(){
        if (divbyzero)
            displayed.innerText = "I ain't doin dat...";
        else
            displayed.innerText = "0";
        this.current = "";
        this.OperandOne = 0;
        this.OperandTwo = 0;
        this.total = 0;
        this.Operator = '';
        decimaladded = false;
        divbyzero = false;
        add.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
        subtract.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
        multiply.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
        divide.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
//      console.log("function called successfully.");
    }),
    //adds a floating point. variable keeps track of floating point inserted (even after deletion)
    AddDecimal:(function(){
        if (decimaladded)
            return;
        else if (this.current == ""){
        this.current += "0.";
        decimaladded = true;
        CalcLogic.UpdateDisplay();
        }
        else{
            this.current += ".";
            decimaladded = true;
            CalcLogic.UpdateDisplay();
        }
    }),
    //operation functions
    AddOperands:(function(){
        if ((this.OperandOne + this.OperandTwo) % 1 != 0)
        return (Number(this.OperandOne) + Number(this.OperandTwo)).toFixed(5);
    else
        return this.OperandOne + this.OperandTwo;
    }),
    SubtractOperands:(function(){
        if ((this.OperandOne - this.OperandTwo) % 1 != 0)
        return (Number(this.OperandOne) - Number(this.OperandTwo)).toFixed(5);
    else
        return this.OperandOne - this.OperandTwo;
    }),
    MultiplyOperands:(function(){
        if ((this.OperandOne * this.OperandTwo) % 1 != 0)
        return (Number(this.OperandOne) * Number(this.OperandTwo)).toFixed(5);
    else
        return this.OperandOne * this.OperandTwo;
    }),
    //case for dividing by zero is covered
    DivideOperands:(function(){
        if (this.OperandTwo == 0){
            divbyzero = true;
            return 0;
        }
        else{
            if (this.OperandOne % this.OperandTwo != 0)
                return (Number(this.OperandOne) / Number(this.OperandTwo)).toFixed(5);
            else
                return this.OperandOne / this.OperandTwo;
        }
    }),
}
//EVENT LISTENER LOGIC
//misc func eventlisteners covered here using object methods
removeone.addEventListener('click',function(){CalcLogic.DeleteCurrent()});
percentified.addEventListener('click',function(){CalcLogic.GetPercent()});
negativified.addEventListener('click',function(){CalcLogic.SetNegative()});
clearall.addEventListener('click',function(){CalcLogic.ClearEverything()});
makeitdecimal.addEventListener('click',function(){CalcLogic.AddDecimal()});
//number pad event listeners. they all do the same thing except for the number inputted
function addzero(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "0";
    CalcLogic.UpdateDisplay();
}
function addone(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "1";    
    CalcLogic.UpdateDisplay();
}
function addtwo(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "2";    
    CalcLogic.UpdateDisplay();
}
function addthree(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "3";    
    CalcLogic.UpdateDisplay();
}
function addfour(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "4";    
    CalcLogic.UpdateDisplay();
}
function addfive(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "5";    
    CalcLogic.UpdateDisplay();
}
function addsix(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "6";    
    CalcLogic.UpdateDisplay();
}
function addseven(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "7";    
    CalcLogic.UpdateDisplay();
}
function addeight(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "8";    
    CalcLogic.UpdateDisplay();
}
function addnine(){
    if (CalcLogic.current.length == 15)
        return;
    CalcLogic.current += "9";    
    CalcLogic.UpdateDisplay();
}
function AppendAdditionOp(){
    decimaladded = false;
    subtract.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    multiply.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    divide.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    if (CalcLogic.Operator == ''){
        if (CalcLogic.total > 0)
                CalcLogic.OperandOne = CalcLogic.total;
            else
                CalcLogic.OperandOne = Number(CalcLogic.current);
        CalcLogic.Operator = '+';
        CalcLogic.UpdateDisplay();
    }
    else{
//        CalcLogic.OperandOne = CalcLogic.total;
        CalcLogic.DoOperation();
        CalcLogic.Operator = '+';
    }
    CalcLogic.current = "";
    add.style.backgroundColor = "Red";
}
function AppendSubtractionOp(){
    decimaladded = false;
    add.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    multiply.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    divide.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    if (CalcLogic.Operator == ''){
        if (CalcLogic.total > 0)
                CalcLogic.OperandOne = CalcLogic.total;
            else
                CalcLogic.OperandOne = Number(CalcLogic.current);
        CalcLogic.Operator = '-';
        CalcLogic.UpdateDisplay();
    }
    else{
//        CalcLogic.OperandOne = CalcLogic.total;
        CalcLogic.DoOperation();
        CalcLogic.Operator = '-';
    }
    CalcLogic.current = "";
    subtract.style.backgroundColor = "Red";
}
function AppendMultiplicationOp(){
    decimaladded = false;
    subtract.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    add.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    divide.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    if (CalcLogic.Operator == ''){
        if (CalcLogic.total > 0)
                CalcLogic.OperandOne = CalcLogic.total;
            else
                CalcLogic.OperandOne = Number(CalcLogic.current);
        CalcLogic.Operator = '*';
        CalcLogic.UpdateDisplay();
    }
    else{
//        CalcLogic.OperandOne = CalcLogic.total;
        CalcLogic.DoOperation();
        CalcLogic.Operator = '*';
    }
    CalcLogic.current = "";
    multiply.style.backgroundColor = "Red";
}
function AppendDivisionOp(){
    decimaladded = false;
    subtract.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    multiply.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    add.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    if (CalcLogic.Operator == ''){
        if (CalcLogic.total > 0)
                CalcLogic.OperandOne = CalcLogic.total;
            else
                CalcLogic.OperandOne = Number(CalcLogic.current);
        CalcLogic.Operator = '/';
        CalcLogic.UpdateDisplay();
    }
    else{
//        CalcLogic.OperandOne = CalcLogic.total;
        CalcLogic.DoOperation();
        CalcLogic.Operator = '/';
    }
    CalcLogic.current = "";
    divide.style.backgroundColor = "Red";
}
function EvalulateEquation(){
    CalcLogic.DoOperation();
//    CalcLogic.current = "";
//    CalcLogic.total = 0;
    add.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    subtract.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    multiply.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
    divide.style.backgroundColor = "rgba(255, 120, 0, 0.863)";
}
zero.addEventListener('click',function(){addzero()});
one.addEventListener('click',function(){addone()});
two.addEventListener('click',function(){addtwo()});
three.addEventListener('click',function(){addthree()});
four.addEventListener('click',function(){addfour()});
five.addEventListener('click',function(){addfive()});
six.addEventListener('click',function(){addsix()});
seven.addEventListener('click',function(){addseven()});
eight.addEventListener('click',function(){addeight()});
nine.addEventListener('click',function(){addnine()});

//these had to be done in if else statements because switch statements do not work for some reason...
document.documentElement.addEventListener('keydown',function(e){
    if (e.key == 0)
    addzero();
    else if (e.key == 1)
    addone();
    else if (e.key == 2)
    addtwo();
    else if (e.key == 3)
    addthree();
    else if (e.key == 4)
    addfour();
    else if (e.key == 5)
    addfive();
    else if (e.key == 6)
    addsix();
    else if (e.key == 7)
    addseven();
    else if (e.key == 8)
    addeight();
    else if (e.key == 9)
    addnine();
    else if (e.key == '+')
    AppendAdditionOp();
    else if (e.key == '-')
    AppendSubtractionOp();
    else if (e.key == '*')
    AppendMultiplicationOp();
    else if (e.key == '/')
    AppendDivisionOp();
    else if (e.key == '=')
    EvalulateEquation();
    else if (e.key == '.')
    CalcLogic.AddDecimal();
    else if (e.key == "Backspace")
    CalcLogic.DeleteCurrent();
    else if (e.key == 'c' || e.key == 'C')
    CalcLogic.ClearEverything();
});
//operations event listeners. The logic is the same for all of them except the operator input
//first, the operator is checked if empty (for multiple operations purposes) and then
//checked if there is a total (to make sure operandone gets total's value)
//Operator will be added to member variable "operator" regardless since its corresponding button was pressed
//current is set to "" to allow for operand two to be inputted
add.addEventListener('click',function(){AppendAdditionOp()});
subtract.addEventListener('click',function(){AppendSubtractionOp()});
multiply.addEventListener('click',function(){AppendMultiplicationOp()});
divide.addEventListener('click',function(){AppendDivisionOp()});
//event listener for equal button. simply calls DoOperation(). It does not need any special cases.
equal.addEventListener('click',function(){EvalulateEquation()});
//initial call of UpdateDisplay() to have the first "0" present.
CalcLogic.UpdateDisplay();
//Made by Daniel "Popusa" Youssef