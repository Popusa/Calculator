//div elements
const displayed = document.querySelector(".display");
const percentified = document.querySelector("#percent");
const negativified = document.querySelector("#negative");
const clearall = document.querySelector("#clear");
const makeitdecimal = document.querySelector("#decimal");
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
const removeone = document.querySelector("#delete");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
//VARIABLES
let decimaladded = false;
let divbyzero  = false;
//CALCLOGIC OBJECT
const CalcLogic = {
    OperandOne: 1,
    OperandTwo: 0,
    current:"",
    total: 0,
    Operator: '',
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
        this.OperandOne = this.total;
        this.OperandTwo = 0;
        this.Operator = '';
    }),
    UpdateDisplay:(function(){
        if (this.current == "")
            displayed.innerText = "0";
        else
            displayed.innerText = this.current;
    }),
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
    GetPercent:(function(){
        let temp = Number(this.current);
        temp /= 100;
        this.current = temp;
        CalcLogic.UpdateDisplay();
//      console.log("percentified");
    }),
    SetNegative:(function(){
        if (this.current == '')
            return;
        else{
            this.current = Number(this.current * -1);
            CalcLogic.UpdateDisplay();
        }
//      console.log("negativied!");
    }),
    ClearEverything:(function(){
        if (divbyzero)
            displayed.innerText = "I ain't doin that...";
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
    AddDecimal:(function(){
        if (decimaladded || this.current == "")
            return;
        else{
            this.current += ".";
            decimaladded = true;
            CalcLogic.UpdateDisplay();
        }
    }),
    AddOperands:(function(){
        return this.OperandOne + this.OperandTwo;
    }),
    SubtractOperands:(function(){
        return this.OperandOne - this.OperandTwo;
    }),
    MultiplyOperands:(function(){
        return this.OperandOne * this.OperandTwo;
    }),
    DivideOperands:(function(){
        if (this.OperandTwo == 0){
            divbyzero = true;
            return 0;
        }
        else
            return this.OperandOne / this.OperandTwo;
    }),
}
//EVENT LISTENER LOGIC
removeone.addEventListener('click',function(){CalcLogic.DeleteCurrent()});
percentified.addEventListener('click',function(){CalcLogic.GetPercent()});
negativified.addEventListener('click',function(){CalcLogic.SetNegative()});
clearall.addEventListener('click',function(){CalcLogic.ClearEverything()});
makeitdecimal.addEventListener('click',function(){CalcLogic.AddDecimal()});
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
equal.addEventListener('click',function(){CalcLogic.DoOperation()});
CalcLogic.UpdateDisplay();