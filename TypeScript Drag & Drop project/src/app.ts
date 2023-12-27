const app = document.getElementById('app')

class ProjectInput {
    inputElement: HTMLTemplateElement
    element: HTMLFormElement
    constructor() {
        this.inputElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.element = (document.importNode(this.inputElement.content,true).firstElementChild) as HTMLFormElement
        this.attach()
    }

    private attach(){
        app?.insertAdjacentElement('afterbegin',this.element)
    }
}

const prjInput = new ProjectInput()
