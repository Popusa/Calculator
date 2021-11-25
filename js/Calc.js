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