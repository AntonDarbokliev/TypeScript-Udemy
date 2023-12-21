class Department {
    name: string;
    private employees : string[];
    location: string;

    constructor(n: string, l: string,) {
        this.name = n;
        this.location = l;
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

const accounting = new Department("Accounting", "Brooklyn");

accounting.addEmployee('Anton')
accounting.addEmployee('Max')
// accounting.employees.push('Ben') 
// Not a good idea to have two ways of adding an employee, hence why we're making it a private propertie

accounting.printEmployees()

accounting.describe();

// const accountingCopy = {
//     name: "Accounting",
//     location: "Copy location",
//     describe: accounting.describe,
// };

// accountingCopy.describe();
