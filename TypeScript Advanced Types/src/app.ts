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

if(input){
    input.value = 'Hi'
}
