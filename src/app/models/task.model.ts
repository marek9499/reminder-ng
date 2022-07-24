export interface Task {
    id: number;
    title: string;
    description: string;
    finishDay: string | null;
    finishHour: string | null;
    stage: string;
    category: string;
    updatedAt: number;
    isImportant: boolean;
}