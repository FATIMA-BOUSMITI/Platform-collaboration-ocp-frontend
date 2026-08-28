export interface Project {
    id: string;
    reference?: string;

    name: string;
    description: string;

    responsableId?: string;
    departmentId?: string;

    startDate?: string;
    endDate?: string;

    projectPriority?: string;
    status?: string;

    progress: number;

    budget?: number;

    // Pour l'affichage actuel
    manager?: string;
    department?: string;
    deadline?: string;
    membersCount?: number;
}