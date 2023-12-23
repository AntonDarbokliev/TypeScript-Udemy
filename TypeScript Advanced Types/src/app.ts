type Employee = {
    name: string;
    age: number;
};

type Admin = {
    name: string;
    privileges: string[];
};

type ElevatedEmployee = Employee & Admin;

let employee: ElevatedEmployee;

employee = {
    name: "Anton",
    age: 18,
    privileges: ["User", "Admin"],
};

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log("Name:  " + emp.name);
    if ("privileges" in emp) {
        console.log("Privileges:  " + emp.privileges);
    }
}

const emp: UnknownEmployee = {
    name: "Anton",
    age: 18,
};

const adminEmp: UnknownEmployee = {
    name: "Bob",
    privileges: ["Admin"],
};

// printEmployeeInfo(emp)
// printEmployeeInfo(adminEmp)

class Vehicle {
    drive() {
        console.log("Currently driving...");
    }
}

class Truck extends Vehicle {
    load(amount: number) {
        console.log("Loading " + amount + "kg");
    }
}

class Boat extends Vehicle {
    sail() {
        console.log("Currently sailing");
    }
}

type VehicleType = Truck | Boat;

function useVehicle(vehicle: VehicleType) {
    vehicle.drive();
    if (vehicle instanceof Boat) {
        vehicle.sail();
    } else if (vehicle instanceof Truck) {
        vehicle.load(200);
    }
}

const v1 = new Truck();
const v2 = new Boat();

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: "bird";
    flyingSpeed: number;
}

interface Horse {
    type: "horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;


//A different pattern for checking for a propretie
function printAnimalSpeed(animal: Animal) {
    let speed: number;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log('Speed: ' +  speed);
}

printAnimalSpeed({type:'bird', flyingSpeed: 300})

const input = document.getElementById('inputText') as HTMLInputElement 
// Type Casting - telling typescript what the type of the variable is if typescript can't figure that out

if(input){
    input.value = 'Hi'
}


interface Errors{
    [prop: string] : string
}
// This syntax allows me to have as many propreties as i like (suitable for scenarios where i don't know how many props i'm getting )
//They need to fit into the criteria that i've set (pretty useful for showing multiple error messages)

const errorsContainer:Errors = {
    name: 'Name should be at least 3 characters long'
} 

type Combineable = string | number

function add(n1:string,n2:string) : string  
function add(n1:number,n2:number) : number
// Function overloading (used to tell typescript about the return type in different scenarios so i can call specific methods)
function add(n1:Combineable,n2:Combineable){
    if(typeof n1 === 'string' || typeof n2 === 'string'){
        return n1.toString() + n2.toString()
    }
    return n1 + n2
}

const result = add('Anton',' Darbokliev')

result.split(' ')

const fetchedData = {
    name: 'Anton',
    job: {title: 'Front-End Trainee', company: "Kodar"}
}

console.log(fetchedData?.job?.title);
// Optional chaining
// (won't contine if the variable before the "?" is undefined, useful for when you are not sure if the data has arrived yet)
