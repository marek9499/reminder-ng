import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStatusStage } from '../enums/task-progress.enum';
import { Task } from '../models/task.model';
import { TaskState } from './task.reducer';

export const getTasksState = createFeatureSelector<TaskState>('todoApp');

export const getRecentTasks = createSelector(
  getTasksState,
  (state: TaskState) => state.tasks
);

export const getTasksBy = (taskStatusStage: TaskStatusStage) =>
  createSelector(getTasksState, (state: TaskState) => {
    if (taskStatusStage === TaskStatusStage.RECENT) {
      return state.tasks;
    }

    return state.tasks.filter((task: Task) => task.stage === taskStatusStage);
  });

export const getTasksByStageLength = (taskStatusStage: TaskStatusStage) =>
  createSelector(
    getTasksState,
    getTasksBy(taskStatusStage),
    (state: TaskState, task: Task[]) => task.length
  );

export const getDisplayMode = createSelector(
  getTasksState,
  (state: TaskState) => state.showByStage
);

export const getTasksCategories = createSelector(
  getTasksState,
  (state: TaskState) => state.categories
);
