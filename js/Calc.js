const displayed = document.querySelector(".display");
const percentified = document.querySelector(".percent");
const negativified = document.querySelector(".negative");
const clearall = doucment.quertySelector("clear");
const one = document.quertySelector(".one");
const two = document.quertySelector(".two");
const three = document.quertySelector(".three");
const four = document.quertySelector(".four");
const five = document.quertySelector(".five");
const six = document.quertySelector(".six");
const seven = document.quertySelector(".seven");
const eight = document.quertySelector(".eight");
const nine = document.quertySelector(".nine");
const zero = document.quertySelector(".zero");
const equal = document.querySelector(".equal");
const removeone = document.querySelector(".delete");
//EVENT LISTENER LOGIC
percentified.addEventListener('click',function(){
    return current / 100;
});
negativified.addEventListener('click',function(){
    return -current;
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