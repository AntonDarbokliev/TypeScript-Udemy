import { Project, ProjectStatus } from "../models/project-model.js"
import { ProjectUI } from "./base-component.js"
import { DragTarget} from '../models/drag&drop.js'
import { AutoBind } from "../decorators/autobind.js"
import { projectState } from "../state/project-state.js"
import { ListItem } from "./list-item-component.js"

export class ProjectList extends ProjectUI<HTMLTableSectionElement,HTMLDivElement> implements DragTarget {
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