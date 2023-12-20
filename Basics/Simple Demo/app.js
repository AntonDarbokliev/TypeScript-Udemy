var input;
var userName;
// input = 5
input = 'Name';
// userName = input  Can't assign values like this if the assigned value 
if (typeof input == 'string') {
    userName = input; //Can assign like this if you check for the right value
}
function errorHandling(message, code) {
    throw { message: message, code: code };
}
errorHandling('Error', 15);
// function noReturn() : never{
//     while(true){}
// }
