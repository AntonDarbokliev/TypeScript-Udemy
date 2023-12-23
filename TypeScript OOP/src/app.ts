interface Person{
    name: string;
    age: number;
    greet(phrase: string):void
}

let user1:Person;

user1= {
    name:'Anton',
    age: 18,
    greet(phrase:string){
        console.log(phrase);   
    }
}

user1.greet('Hello')