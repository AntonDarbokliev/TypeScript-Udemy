export enum ProjectStatus {Active,Finished}

export class Project {
    constructor(
        public title:string, 
        public description: string, 
        public numOfPeople: number,
        public status: ProjectStatus,
        public id: string
        ){}
}