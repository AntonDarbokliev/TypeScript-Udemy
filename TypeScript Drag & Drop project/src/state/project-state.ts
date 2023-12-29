import { Project, ProjectStatus } from "../models/project-model.js"

export type Listener<T> = (items: T[]) => void

abstract class State<T> {
    protected listeners: Listener<T>[]

    constructor(){
        this.listeners = []
    }

    addListener(listenerFn:Listener<T>){
        this.listeners.push(listenerFn)
    }
}

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance()