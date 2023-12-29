export abstract class ProjectUI<T extends HTMLElement,U extends HTMLElement> {
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