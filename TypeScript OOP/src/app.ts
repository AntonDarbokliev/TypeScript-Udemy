class Department {
    name: string;
    location:string

    constructor(n: string,l:string) {
        this.name = n;
        this.location = l
    }

    describe(this:Department) {
        console.log(`This is the ${this.name} department`);
    }
}

const accounting = new Department("Accounting",'Brooklyn');

const accountingCopy = {name: 'Accounting', location:'Copy location',describe: accounting.describe };

accounting.describe();

accountingCopy.describe();
