import { TaskStatusStage } from "../enums/task-progress.enum";

export interface Task {
    id: number;
    title: string;
    description: string;
    finishDay: string | null;
    finishHour: string | null;
    stage: TaskStatusStage;
    category: string;
    updatedAt: number;
    isImportant: boolean;
}