function add (num1 : number,num2: number){
    return num1 + num2
}

function printRes (result : number,printSuccess : () => void) : void {
    console.log('Result: ' + result);
}

let combineValues: (a: number,b:number) => number;

combineValues = add

function printSuccess(){
    console.log('Success');
    return 'Success'  
    //Can still return even though the print function accepts a function that returns void, it will just ignore the return
}

printRes(combineValues(1,2),printSuccess)