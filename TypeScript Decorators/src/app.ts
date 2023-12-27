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


// function PropertieDecorator(target:any,propertyName: string | Symbol){
//     console.log('Property decorator');
//     console.log(target, propertyName);
// }

// function AccessorDecorator(target:any,name:string,descriptor: PropertyDescriptor){
//     console.log('Accessor Decorator');
//     console.log(target,name,descriptor);
// }

// function methodDecorator(target:any,name: string,descriptor: PropertyDescriptor ){
//     console.log('Method Decorator');
//     console.log(target,name,descriptor);
// }

// function propertieDescriptor(target:any,name:string,position:number){
//     console.log('Propertie Decorator');
//     console.log(target,name,position);

// }

// class Product {
//     @PropertieDecorator
//     title:string;
//     _price:number;

//     @AccessorDecorator
//     set price (value:number){
//         this._price = value
//     }
    
//     constructor(t:string,p:number){
//         this.title = t
//         this._price = p
//     }

//     @methodDecorator
//     logPrice(@propertieDescriptor currency:string){
//         console.log(this._price + currency);
//     }

// }

// function BindMethod(_: any, _2: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value
//     const newDescriptor: PropertyDescriptor = {
//         configurable: true,
//         enumerable: false,
//         get() {
//             const newRef = originalMethod.bind(this)
//             return newRef
//         },
//     }
//     return newDescriptor
// }

// class Printer {
//     message = 'This works!'
    
//     @BindMethod
//     showMessage(){
//         console.log(this.message);
//     }
// }

// const p = new Printer()

// const button = document.querySelector('button')!
// button.addEventListener('click', p.showMessage)

interface ValidatorConfig {
    [className:string] : {
        [propertyName:string] : string[] //['required', 'positive'...]
    }    
}

const registeredValidators: ValidatorConfig = {}

function Required (target:any, propName:string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName] : ['required']
    }
}

function PositiveNumber (target:any, propName:string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName] : ['positive']
    }

}

function validate(obj:any){
    const objectValidatorConfig = registeredValidators[obj.constructor.name]
    if(!objectValidatorConfig){
        return true
    }

    let isValid = true;
    for(const prop in objectValidatorConfig){
        for(const validator of objectValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0
                    break;
            }
        }
    }
    return isValid
}


class Course{
    @Required
    title:string
    @PositiveNumber
    price:number
    constructor(t:string,p:number){
        this.title = t
        this.price = p
    }
}

const form = document.querySelector('form')
form?.addEventListener('submit',(e) => {
    e.preventDefault()
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title,price)

    if(!validate(createdCourse)){
        alert('Invalid input!')
    }
    console.log(createdCourse);
    
})
