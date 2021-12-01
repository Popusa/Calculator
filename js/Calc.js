const displayed = document.querySelector(".display");
const percentified = document.querySelector("#percent");
const negativified = document.querySelector("#negative");
const clearall = document.querySelector("#clear");
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
const divide = document.querySelector("#multiply");
const multiply = document.querySelector("#divide");
const CalcLogic = {
    OperandOne: 0,
    OperandTwo: 0,
    current:"0",
    total: 0,
    Operator: '',
    Operate:function(){

    },
    UpdateDisplay:function(){
        displayed.innerText = this.current;
    },
    AddOperands:function(){
        return this.OperandOne + this.OperandTwo;
    },
    SubtractOperands:function(){
        return this.OperandONe - this.OperandTwo;
    },
    MultiplyOperands:function(){
        return this.OperandOne * this.OperandTwo;
    },
    DivideOperands:function(){
        if (this.OperandTwo == 0)
            return "I ain't doing that...";
        else
            return this.OperandOne / this.OperandTwo;
    },
    DeleteCurrent:function(){
        this.current[this.current.length - 1] = "";
        CalcLogic.UpdateDisplay();
    }, 
    GetPercent:function(){
        this.current / 100;
        CalcLogic.UpdateDisplay();
    },
    SetNegative:function(){
        current = -this.current;
        CalcLogic.UpdateDisplay();
    },
    ClearEverything:function(){
        this.current = "";
        this.OperandOne = 0;
        this.OperandTwo = 0;
        this.total = 0;
        this.Operator = '';
        CalcLogic.UpdateDisplay();
    },
};
//EVENT LISTENER LOGIC
percentified.addEventListener('click',CalcLogic.GetPercent());
negativified.addEventListener('click',CalcLogic.SetNegative());
clearall.addEventListener('click',CalcLogic.ClearEverything());
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
displayed.innerText = "0";