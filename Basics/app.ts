const person
 : {
    name : string;
    age : number;
    hobbies: string[];
    roles: [number,string]; //tuple
} 
= {
    name: 'Anton',
    age: 18,
    hobbies : ['Skiing','Football'],
    roles : [2,'admin']
}

// person.roles.push('a') //not supported by ts
// person.roles = []

for(const hobbie of person.hobbies){
    console.log(hobbie.toLowerCase());
}



console.log(person.name);
