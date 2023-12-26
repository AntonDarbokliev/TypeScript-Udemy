function Logger(elementId:string){
    return function (constructor:any){
    const element = document.getElementById(elementId)
    const p = new constructor()
        if(element){
            element.textContent = p.name
        }    
    }
}


@Logger('app')
class Person {
    name = 'Max'

    constructor(){
        console.log('Creating person object...');
    }
}

const person1 = new Person()
