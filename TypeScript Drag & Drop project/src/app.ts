const app = document.getElementById("app");

interface Draggable{
    dragStartHandler(e: DragEvent):void
    dragEndHandler(e: DragEvent):void
}

interface DragTarget {
    dragOverHandler(e: DragEvent):void
    dropHandler(e: DragEvent):void
    dragLeaveHandler(e: DragEvent):void
}

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

type Listener<T> = (items: T[]) => void

abstract class State<T> {
    protected listeners: Listener<T>[]

    constructor(){
        this.listeners = []
    }

    addListener(listenerFn:Listener<T>){
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project> {
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

       this.updateListeners()
    }

    moveProject(projectId:string){
        const projectToMove = this.projects.find(x => x.id === projectId)

        if(!projectToMove){
            throw 'Project not found'
        }

        if(projectToMove.status === ProjectStatus.Active){
            projectToMove.status = ProjectStatus.Finished 
        }else{
            projectToMove.status = ProjectStatus.Active 
        }

        this.updateListeners()

    }


    updateListeners(){
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice())
        }
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

abstract class ProjectUI<T extends HTMLElement,U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    element: T;
    elementId?: string;
    beforeEnd: boolean;
    hostElement: U;

     constructor(templateId:string,beforeEnd:boolean,hostElementId:string,elementId?:string){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
        this.element = document.importNode(this.templateElement.content, true).firstElementChild as T;

        this.hostElement = document.getElementById(hostElementId) as U;        

        if(elementId){
            this.element.id = elementId
        } 

        this.beforeEnd = beforeEnd

        this.attach()
     }

     private attach() {
        this.hostElement.insertAdjacentElement(this.beforeEnd ?  'beforeend': "afterbegin", this.element);
    }

    abstract configure?():void

}

class ListItem extends ProjectUI<HTMLLIElement,HTMLUListElement> implements Draggable {
    private project: Project

    get people(){
        if(this.project.numOfPeople == 1){
            return '1 person assigned'
        }
        return `${this.project.numOfPeople} people assigned`
    }

    constructor(hostId:string,project:Project){
        super('single-project',true,hostId,)
        this.project = project
        this.renderContent()
        console.log('LIST ITEM');
        
        this.configure()
    }

    dragEndHandler(_: DragEvent): void {
        // console.log('End drag');
        // console.log(e);
        
    }
    
    @AutoBind
    dragStartHandler(e: DragEvent): void {
        e.dataTransfer!.setData('text/plain',this.project.id);
        e.dataTransfer!.effectAllowed = 'move';
    }

    configure(): void {
        console.log('element',this.element);
        
        this.element.addEventListener('dragstart',this.dragStartHandler)
        this.element.addEventListener('dragend',this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector(
          'h3'
        )!.textContent = this.people;
        this.element.querySelector('p')!.textContent = this.project.description;
      }
}

class ProjectList extends ProjectUI<HTMLTableSectionElement,HTMLDivElement> implements DragTarget {
    currentProjects: Project[];

    constructor(private type: 'active' | 'finished'){
        super('project-list',true,'app',`${type}-projects`)

        this.currentProjects = []

        this.configure()
        
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
        this.element.querySelector('ul')!.classList.remove('droppable')        
    }

    @AutoBind
    dragOverHandler(e: DragEvent): void {
        if(e.dataTransfer && e.dataTransfer.types[0] === 'text/plain'){
            e.preventDefault()
            this.element.querySelector('ul')!.classList.add('droppable')
        }
    }

    dropHandler(e: DragEvent): void {
        const prjId = e.dataTransfer!.getData('text/plain')
        
        projectState.moveProject(prjId )

        console.log(projectState);
        
        
    }
    
    configure(): void {
        this.element.addEventListener('dragover',this.dragOverHandler)
        this.element.addEventListener('dragleave',this.dragLeaveHandler)
        this.element.addEventListener('drop',this.dropHandler)
        projectState.addListener((projects:Project[]) => {                        
            const filteredProjects = projects.filter(x =>ProjectStatus[x.status].toLowerCase() === this.type )
            
            this.currentProjects = filteredProjects
            this.renderProjects()
        })

        this.filloutList()
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement        
        
        listEl.innerHTML = ''
        for(const prjItem of this.currentProjects ){
            const listItem = new ListItem(this.element.querySelector('ul')!.id,prjItem)
            listEl.appendChild(listItem.element)
        }

    }


    private filloutList(){
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`
    }
}


class ProjectInput extends ProjectUI<HTMLFormElement,HTMLDivElement> {
    title: HTMLInputElement;
    description: HTMLInputElement;
    people: HTMLInputElement;
    submitBtn: HTMLButtonElement;
    constructor() {
        super("project-input",false,'app','user-input')

        this.title = document.getElementById("title")! as HTMLInputElement;

        this.description = document.getElementById(
            "description"
        )! as HTMLInputElement;
        this.people = document.getElementById("people")! as HTMLInputElement;

        this.submitBtn = this.element.getElementsByTagName("button")[0];

        this.configure()

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

    configure(): void {
        this.submitBtn.addEventListener("click", this.submit);
        
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
