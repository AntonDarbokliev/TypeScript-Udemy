class Department {
    // name: string;
    private employees : string[];
    // location: string;

    constructor(public readonly name: string, public location: string) {
        this.name = name;
        this.location = location;
        this.employees = []
    }

    describe(this: Department) {
        console.log(`This is the ${this.name} department`);
    }

    addEmployee(employee:string){
        this.employees.push(employee)
    }

    printEmployees(){
        console.log('Employees: ' + this.employees.join(', '));
    }
}

class IT extends Department {
    constructor(public readonly location: string){
        super('IT',location)
    }
}

// const accounting = new Department("Accounting", "Brooklyn");

// accounting.addEmployee('Anton')
// accounting.addEmployee('Max')
// accounting.employees.push('Ben') 
// Not a good idea to have two ways of adding an employee, hence why we're making it a private propertie

// accounting.printEmployees()

// accounting.describe();

// const accountingCopy = {
//     name: "Accounting",
//     location: "Copy location",
//     describe: accounting.describe,
// };

// accountingCopy.describe();

const it = new IT('Plovdiv')

it.addEmployee('Nasko')

console.log(it);

