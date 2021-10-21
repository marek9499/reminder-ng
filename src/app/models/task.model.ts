export interface Task {
    id?: number;
    title: string;
    description: string;
    finishDate: string | null;
    stage: string;
    category: string;
    updatedAt: number;
}