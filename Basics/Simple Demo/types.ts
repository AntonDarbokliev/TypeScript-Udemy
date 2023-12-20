type Combinable = number | string  // Union Types             //<------- aliases ( custom types)
type Conversion = 'as-text' | 'as-number' //Literal Types    //<------- aliases ( custom types)

function add(
    num1: Combinable,
    num2: Combinable, 
    resultConversion: Conversion  
) {    
    let result: any;
    if (typeof num1 == "number" && typeof num2 == "number" || resultConversion === 'as-number') {
        result = +num1 + +num2;
    } else{
        result = num1.toString() + num2.toString();
    }

    return result;
}

console.log(add("anton", "darbokliev",'as-text'));
