// const person
//  : {
//     name : string;
//     age : number;
//     hobbies: string[];
//     roles: [number,string]; //tuple
// } 
// = {
//     name: 'Anton',
//     age: 18,
//     hobbies : ['Skiing','Football'],
//     roles : [2,'admin']
// }

// person.roles.push('a') //not supported by ts
// person.roles = []

enum Role {ADMIN, GUEST, READ_ONLY}  //Enum - used to pair keys with human readable values for easier usage


const person = {
    name: 'Anton',
    age: 18,
    hobbies : ['Skiing','Football'],
    role : Role.ADMIN
}

for(const hobbie of person.hobbies){
    console.log(hobbie.toLowerCase());
}



console.log(person.name);
