class Department {
    // name: string;
    protected employees : {}[];
    // location: string;
    static fiscalYear = 2020

    constructor(public readonly name: string, public location: string) {
        this.name = name;
        this.location = location;
        this.employees = []
    }

    static createEmployee(name:string){
        return{name}
    }


    describe(this: Department) {
        console.log(`This is the ${this.name} department`);
    }

    addEmployee(employee:{name:string}){
        this.employees.push(employee)
    }

    printEmployees(){
        console.log('Employees: ' + this.employees.join(', '));
    }
}

class IT extends Department {
    private tickets:string[]

    get departmentTickets(): string[]{
        return this.tickets
    }

    set departmentTickets(value:string[]){
        this.tickets = value
    }

    constructor(public readonly location: string){
        super('IT',location)
        this.tickets = []
    }

    addEmployee(employee: {name:string}) {
        this.employees.push(employee)
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

const employee = Department.createEmployee('Max')

const it = new IT('Plovdiv')

it.addEmployee(employee)

console.log(it);


// console.log(Department.fiscalYear);


// console.log(it.departmentTickets);
// it.departmentTickets = ['Problem1']
// console.log(it.departmentTickets);


