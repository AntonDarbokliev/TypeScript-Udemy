type Employee = {
    name: string,
    age: number,
}

type Admin = {
    name: string,
    privileges: string[]
}

type ElevatedEmployee = Employee & Admin

let employee: ElevatedEmployee;

employee = {
    name : 'Anton',
    age: 18,
    privileges : ['User', 'Admin']
}