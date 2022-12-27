import { TaskStatusStage } from '../enums/task-progress.enum';

export interface Tabs {
  name: string;
  stage: TaskStatusStage;
}
