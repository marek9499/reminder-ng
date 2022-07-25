import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStatus } from '../enums/task-progress.enum';
import { Task } from '../models/task.model';
import { TaskState } from './task.reducer';

export const getTasksState = createFeatureSelector<TaskState>('tasks');

export const getRecentTasks = createSelector(
  getTasksState,
  (state: TaskState) => state.tasks
);

export const getStartedTasks = createSelector(
  getTasksState,
  (state: TaskState) => state.tasks.filter((task: Task) => task.stage === TaskStatus.STARTED)
)

export const getDisplayMode = createSelector(
  getTasksState,
  (state: TaskState) => state.displayMode
)