const app = document.getElementById("app");

enum ProjectStatus {Active,Finished}

class Project {
    constructor(
        public title:string, 
        public description: string, 
        public numOfPeople: number,
        public status: ProjectStatus,
        public id: string
        ){}
}

type Listener = (items: Project[]) => void

class ProjectState  {
    private listeners :any[] = []
    private projects:Project[] = []
    private static instance:ProjectState;

    static getInstance(){
        if(!this.instance){
            this.instance = new ProjectState()
        }
        
        return this.instance
    }

    addProject(title:string,description:string,numOfPeople:number){

        const project = new Project(title,description,numOfPeople,ProjectStatus.Active,Math.random().toString())
        this.projects.push(project)
        console.log(project);
        

        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice())
        }
    }

    addListener(listenerFn:Function){
        this.listeners.push(listenerFn)
    }
}

const projectState = ProjectState.getInstance()

interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
}

function validate(obj:Validatable){
    let isValid = true
    if(obj.required){
        isValid = isValid && obj.value.toString().trim().length > 0
    }

    if(obj.maxLength){
        isValid = isValid && obj.value.toString().trim().length < obj.maxLength
    }

    if(obj.minLength){
        isValid = isValid && obj.value.toString().trim().length > obj.minLength
    }

    return isValid

}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return oldValue.bind(this);
        },
    };
    return newDescriptor;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    element: HTMLTableSectionElement;
    currentProjects: Project[];

    constructor(private type: 'active' | 'finished'){
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement
        this.element = document.importNode(this.templateElement.content, true).firstElementChild as HTMLTableSectionElement;
        this.element.id = this.type + '-projects'

        this.currentProjects = []

        projectState.addListener((projects:Project[]) => {                        
            const filteredProjects = projects.filter(x =>ProjectStatus[x.status].toLowerCase() === this.type )
            console.log(filteredProjects);
            
            this.currentProjects = filteredProjects
            this.renderProjects()
        })

        this.attach()
        this.filloutList()
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement        
        
        listEl.innerHTML = ''
        for(const prjItem of this.currentProjects ){
            const listItem = document.createElement('li')
            listItem.textContent = prjItem.title
            listEl.appendChild(listItem)
        }

    }

    private filloutList(){
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`
    }

    private attach() {
        app!.insertAdjacentElement('beforeend', this.element);
    }
}


class ProjectInput {
    inputElement: HTMLTemplateElement;
    element: HTMLFormElement;
    title: HTMLInputElement;
    description: HTMLInputElement;
    people: HTMLInputElement;
    submitBtn: HTMLButtonElement;
    constructor() {
        this.inputElement = document.getElementById(
            "project-input"
        )! as HTMLTemplateElement;
        this.element = document.importNode(this.inputElement.content, true)
            .firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.attach();

        this.title = document.getElementById("title")! as HTMLInputElement;

        this.description = document.getElementById(
            "description"
        )! as HTMLInputElement;
        this.people = document.getElementById("people")! as HTMLInputElement;

        this.submitBtn = this.element.getElementsByTagName("button")[0];

        this.submitBtn.addEventListener("click", this.submit);
    } 

    private clearInputs(){
        this.title.value = '';
        this.description.value = '';
        this.people.value = '';
    }

    private getUserInput(): [string, string, number] | void {
        const titleValue = this.title.value;
        const descriptionValue = this.description.value;
        const peopleValue = +this.people.value;
        if(
            validate({value:titleValue,required: true, minLength: 3,maxLength: 10}) &&
            validate({value:descriptionValue,required: true, minLength: 10}) && 
            validate({value:peopleValue,required: true})
        ){
            return [titleValue, descriptionValue, peopleValue];
        }else{
            alert('Inavlid input')
        }

    }

    private attach() {
        app?.insertAdjacentElement("afterbegin", this.element);
    }

    @AutoBind
    private submit(e: Event) {
        e.preventDefault();
        const [title,description,numOfPeople] = this.getUserInput()!;

        projectState.addProject(title,description,numOfPeople)
        this.clearInputs()
    }
}

const prjList = new ProjectList('active')
const prjList2 = new ProjectList('finished')
const prjInput = new ProjectInput();
