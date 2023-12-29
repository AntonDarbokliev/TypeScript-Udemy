import { Project } from "../models/project-model.js"
import { ProjectUI } from "./base-component.js"
import { Draggable} from '../models/drag&drop.js'
import { AutoBind } from "../decorators/autobind.js"

export class ListItem extends ProjectUI<HTMLLIElement,HTMLUListElement> implements Draggable {
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
