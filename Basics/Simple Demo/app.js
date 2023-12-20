function add(num1, num2) {
    var result;
    if (typeof num1 == 'number' && typeof num2 == 'number') {
        result = num1 + num2;
    }
    else {
        result = num1.toString() + num2.toString();
    }
    return result;
}
console.log(add('anton', 'darbokliev'));
