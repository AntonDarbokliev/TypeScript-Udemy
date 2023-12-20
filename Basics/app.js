var person = {
    name: 'Anton',
    age: 18,
    hobbies: ['Skiing', 'Football'],
    roles: [2, 'admin']
};
// person.roles.push('a') //not supported by ts
// person.roles = []
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobbie = _a[_i];
    console.log(hobbie.toLowerCase());
}
console.log(person.name);
