import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStatusStage } from '../enums/task-progress.enum';
import { Task } from '../models/task.model';
import { TaskState } from './task.reducer';

export const getTasksState = createFeatureSelector<TaskState>('todoApp');

export const getRecentTasks = createSelector(
  getTasksState,
  (state: TaskState) => state.tasks
);

export const getTasksBySelectedMenuType = (taskStatusStage: TaskStatusStage) =>
  createSelector(getTasksState, (state: TaskState) => {
    if (taskStatusStage === TaskStatusStage.RECENT) {
      return state.tasks;
    }

    if (taskStatusStage === TaskStatusStage.HIGH_PRIORITY) {
      return state.tasks.filter((task: Task) => task.isImportant === true);
    }

    return state.tasks.filter((task: Task) => task.stage === taskStatusStage);
  });

export const getTasksByStageLength = (taskStatusStage: TaskStatusStage) =>
  createSelector(
    getTasksState,
    getTasksBySelectedMenuType(taskStatusStage),
    (state: TaskState, task: Task[]) => task.length
  );

export const getSelectedMenuType = createSelector(
  getTasksState,
  (state: TaskState) => state.showByStage
);

export const getTasksCategories = createSelector(
  getTasksState,
  (state: TaskState) => state.categories
);
