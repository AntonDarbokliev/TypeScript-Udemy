function add (num1 : number,num2: number){
    return num1 + num2
}

function printRes (result : number) : void {
    console.log('Result: ' + result);
}

let combineValues: (a: number,b:number) => number;

combineValues = add

printRes(combineValues(1,2))