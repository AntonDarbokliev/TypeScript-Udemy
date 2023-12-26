function Logger(logString:string){
    return function (constructor:Function){
        console.log(logString);
        console.log(constructor);
    }
}


@Logger('LOG')
class Person {
    name = 'Max'

    constructor(){
        console.log('Creating person object...');
    }
}

const person1 = new Person()
