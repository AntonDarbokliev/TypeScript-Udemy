import { ProjectUI } from "./base-component"
import { AutoBind } from "../decorators/autobind"
import { projectState } from "../state/project-state"
import { validate } from "../utils/validation";

export class ProjectInput extends ProjectUI<HTMLFormElement,HTMLDivElement> {
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