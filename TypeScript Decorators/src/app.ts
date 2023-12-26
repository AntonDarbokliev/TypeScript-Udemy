// function Logger(elementId:string){
//     return function (constructor:any){
//     const element = document.getElementById(elementId)
//     const p = new constructor()
//         if(element){
//             element.textContent = p.name
//         }    
//     }
// }


// @Logger('app')
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
