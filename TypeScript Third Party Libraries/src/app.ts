// import _ from 'lodash'
import 'reflect-metadata';
// import { plainToClass } from 'class-transformer';

import {IsNotEmpty,validate,IsNumber, IsPositive} from 'class-validator'

class Product{

    @IsNotEmpty()
    title:string

    @IsPositive()
    @IsNumber()
    price:number

    constructor(title:string, price:number){
        this.title = title
        this.price = price
        
        validate(this).then(err => {
            if(err.length > 0){
                console.log('ERRORS FOUND');
                console.log(err);
            }
            
        })
    }

    getProductInformation(){
        console.log([this.title,this.price]);   
    }

}

// const products = [
//     {title:'LOL', price:19.99},
//     {title:'Harry Potter', price:29.99},
// ]

// const loadedProducts = products.map(x => new Product(x.title,x.price)) 



// const loadedProducts = plainToClass(Product,products)

// for(const product of loadedProducts){
//     product.getProductInformation()
// }
// console.log(_.shuffle([1,2,3]));

const product = new Product('',19.99)
console.log(product);

