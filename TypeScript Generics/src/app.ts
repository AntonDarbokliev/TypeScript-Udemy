// const arr: Array<string> = ['a a','b']

// arr[0].split(' ')

// const promise: Promise<string> = new Promise((resolve,reject) => {
//     setTimeout(()=>{
//         resolve('Done')
//     },2000)
// })

// promise.then((data) => {
//     data.split('')
// })

// function merge <T extends object, U extends object>(objA: T, objB: U) {
//     return Object.assign(objA,objB)
// }

// const obj1 = {name:'Anton'}
// const obj2 = {age:18}
// const obj2 = 18

// const result = merge(obj1,obj2)
// console.log(result);

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element:T){    
    return [element,element.length]
}

// console.log(countAndDescribe(['Hello World']));

function extractAndConvert<T extends object,U extends keyof T>(obj : T,key:U){
    return obj[key]             //We are making sure that the key we are getting through the params actually exists in the object
}

extractAndConvert({name:'Anton'},'name')
 
