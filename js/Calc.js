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
    //complete reset of all global, and member variables. Also, includes a part incase the user reset after dividing by zero.
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
//      console.log("function called successfully.");
    }),
    //adds a floating point. variable keeps track of floating point inserted (even after deletion)
    AddDecimal:(function(){
        if (decimaladded || this.current == "")
            return;
        else{
            this.current += ".";
            decimaladded = true;
            CalcLogic.UpdateDisplay();
        }
    }),
    //operation functions
    AddOperands:(function(){
        if ((this.OperandOne + this.OperandTwo) % 1 != 0)
        return (this.OperandOne + this.OperandTwo).toFixed(5);
    else
        return this.OperandOne + this.OperandTwo;
    }),
    SubtractOperands:(function(){
        if ((this.OperandOne - this.OperandTwo) % 1 != 0)
        return (this.OperandOne - this.OperandTwo).toFixed(5);
    else
        return this.OperandOne - this.OperandTwo;
    }),
    MultiplyOperands:(function(){
        if ((this.OperandOne * this.OperandTwo) % 1 != 0)
        return (this.OperandOne * this.OperandTwo).toFixed(5);
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
                return (this.OperandOne / this.OperandTwo).toFixed(5);
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
zero.addEventListener('click',function(){
    CalcLogic.current += "0";
    CalcLogic.UpdateDisplay();
});
one.addEventListener('click',function(){
    CalcLogic.current += "1";    
    CalcLogic.UpdateDisplay();
});
two.addEventListener('click',function(){
    CalcLogic.current += "2";    
    CalcLogic.UpdateDisplay();
});
three.addEventListener('click',function(){
    CalcLogic.current += "3";    
    CalcLogic.UpdateDisplay();
});
four.addEventListener('click',function(){
    CalcLogic.current += "4";    
    CalcLogic.UpdateDisplay();
});
five.addEventListener('click',function(){
    CalcLogic.current += "5";    
    CalcLogic.UpdateDisplay();
});
six.addEventListener('click',function(){
    CalcLogic.current += "6";    
    CalcLogic.UpdateDisplay();
});
seven.addEventListener('click',function(){
    CalcLogic.current += "7";    
    CalcLogic.UpdateDisplay();
});
eight.addEventListener('click',function(){
    CalcLogic.current += "8";    
    CalcLogic.UpdateDisplay();
});
nine.addEventListener('click',function(){
    CalcLogic.current += "9";    
    CalcLogic.UpdateDisplay();
});
//operations event listeners. The logic is the same for all of them except the operator input
//first, the operator is checked if empty (for multiple operations purposes) and then
//checked if there is a total (to make sure operandone gets total's value)
//Operator will be added to member variable "operator" regardless since its corresponding button was pressed
//current is set to "" to allow for operand two to be inputted
add.addEventListener('click',function(){
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
});
subtract.addEventListener('click',function(){
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
});
multiply.addEventListener('click',function(){
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
});
divide.addEventListener('click',function(){
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
});
//event listener for equal button. simply calls DoOperation(). It does not need any special cases.
equal.addEventListener('click',function(){CalcLogic.DoOperation()});
//initial call of UpdateDisplay() to have the first "0" present.
CalcLogic.UpdateDisplay();
//Made by Daniel "Popusa" Youssef