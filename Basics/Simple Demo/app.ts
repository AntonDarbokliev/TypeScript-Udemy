let input:unknown;

let userName:string;

// input = 5
input = 'Name'

// userName = input  Can't assign values like this if the assigned value 

if(typeof input == 'string'){
    userName = input //Can assign like this if you check for the right value
}


function errorHandling(message: string, code: number): never { //Type never because there is now way for the function to return anything
    throw {message,code}
}

errorHandling('Error',15)

// function noReturn() : never{
//     while(true){}
// }