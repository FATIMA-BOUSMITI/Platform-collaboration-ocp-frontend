export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "ARCHIVED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Task {
    id: string;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee?: string;
    comments?: number;
    commentsCount?: number;
}