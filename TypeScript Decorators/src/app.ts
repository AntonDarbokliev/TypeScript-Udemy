// function WithTemplate(elementId:string){
//     return function <T extends {new(...args:any[]):{name:string}}> (originalConstructor:T){
//         return class extends originalConstructor{
//             constructor(..._:any[]){
//                 super()
//                 const element = document.getElementById(elementId)
//                     if(element){
//                         element.textContent = this.name
//                     }
//             }
//         }
//     }
// }

// @WithTemplate('app')
// class Person {
//     name = 'Max'

//     constructor(){
//         console.log('Creating person object...');
//     }
// }

// const person1 = new Person()

//  ---


function PropertieDecorator(target:any,propertyName: string | Symbol){
    console.log('Property decorator');
    console.log(target, propertyName);
}

function AccessorDecorator(target:any,name:string,descriptor: PropertyDescriptor){
    console.log('Accessor Decorator');
    console.log(target,name,descriptor);
}

function methodDecorator(target:any,name: string,descriptor: PropertyDescriptor ){
    console.log('Method Decorator');
    console.log(target,name,descriptor);
}

function propertieDescriptor(target:any,name:string,position:number){
    console.log('Propertie Decorator');
    console.log(target,name,position);

}

class Product {
    @PropertieDecorator
    title:string;
    _price:number;

    @AccessorDecorator
    set price (value:number){
        this._price = value
    }
    
    constructor(t:string,p:number){
        this.title = t
        this._price = p
    }

    @methodDecorator
    logPrice(@propertieDescriptor currency:string){
        console.log(this._price + currency);
    }

}

function BindMethod(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const newRef = originalMethod.bind(this)
            return newRef
        },
    }
    return newDescriptor
}

class Printer {
    message = 'This works!'

    @BindMethod
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)
