function add(num1, num2) {
    return num1 + num2;
}
function printRes(result) {
    console.log('Result: ' + result);
}
var combineValues;
combineValues = add;
printRes(combineValues(1, 2));
