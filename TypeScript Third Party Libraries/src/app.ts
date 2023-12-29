import _ from 'lodash'
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';


class Product{
    constructor(public title:string,public price:number){
        this.title = title
        this.price = price
    }

    getProductInformation(){
        console.log([this.title,this.price]);
        
    }

}

const products = [
    {title:'LOL', price:19.99},
    {title:'Harry Potter', price:29.99},
]

// const loadedProducts = products.map(x => new Product(x.title,x.price)) 



const loadedProducts = plainToClass(Product,products)

for(const product of loadedProducts){
    product.getProductInformation()
}
// console.log(_.shuffle([1,2,3]));
