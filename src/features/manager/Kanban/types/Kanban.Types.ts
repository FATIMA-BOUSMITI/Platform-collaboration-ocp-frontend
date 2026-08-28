export type TaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

export type TaskPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export interface KanbanTask {

    id: string;

    title: string;

    description?: string;

    priority: TaskPriority;

    status: TaskStatus;

    assignee: string;

    commentsCount: number;

}