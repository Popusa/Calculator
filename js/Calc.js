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
//EVENT LISTENER LOGIC
percentified.addEventListener('click',function(){
    return current / 100;
});
negativified.addEventListener('click',function(){
    return current * -1;
});
clearall.addEventListener('click',function(){
    displayed.innerText = "0";
    current = "";
    OperandOne = 0;
    OperandTwo = 0;
    total = 0;
    Operator = '';
    return true;
});
const CalcLogic = {
    OperandOne: 0,
    OperandTwo: 0,
    current:"",
    total: 0,
    Operator: '',
    Operate:function(){

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
    }, 
    GetPercent:function(){
        this.current / 100;
    },
    SetNegative:function(){
        current = -this.current;
    },
    ClearAll:function(){
        this.OperandOne = 0;
        this.OperandTwo = 0;
    }
};
displayed.innerText = "0";