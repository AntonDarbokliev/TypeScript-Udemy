const app = document.getElementById("app");

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    const newDescriptor:PropertyDescriptor = {
        configurable:true,
        enumerable:false,
        get() {
            return oldValue.bind(this)
        },
    }
    return newDescriptor
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

        this.title = document.getElementById("title")! as HTMLInputElement;
        this.description = document.getElementById(
            "description"
        )! as HTMLInputElement;
        this.people = document.getElementById("people")! as HTMLInputElement;

        this.submitBtn = this.element.getElementsByTagName("button")[0];

        this.submitBtn.addEventListener("click", this.submit);

        this.attach();
    }

    private attach() {
        app?.insertAdjacentElement("afterbegin", this.element);
    }

    @AutoBind
    private submit(e: Event) {
        e.preventDefault();
        console.log(this.element);
    }
}

const prjInput = new ProjectInput();
