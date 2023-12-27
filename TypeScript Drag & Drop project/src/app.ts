const app = document.getElementById("app");

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

        //validate({value:titleValue,requried: true, minLength: 5})

    }

    private attach() {
        app?.insertAdjacentElement("afterbegin", this.element);
    }

    @AutoBind
    private submit(e: Event) {
        e.preventDefault();
        const inputValues = this.getUserInput();

        console.log(inputValues);
        this.clearInputs()
    }
}

const prjInput = new ProjectInput();
