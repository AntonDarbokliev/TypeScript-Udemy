// type AddFn = (n1:number,n2:number) => number --- function type
interface AddFn {
    (n1:number,n2:number) : number      // function interface
}

let add: AddFn;

 add = (n1:number,n2:number) => {
    return n1 + n2
}

interface Named {
    readonly name:string
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    constructor(public name: string = 'Guest', public age: number = 18) {}

    greet (phrase: string): void {
        if(this.name !== 'Guest'){
            console.log(phrase);
        }else{
            console.log('Guests cannot greet');
        }
    }
}

let user1: Greetable;

user1 = new Person();
// user1.name= 'paco' -- readonly is assumed because of the interface
user1.greet("Hello");
