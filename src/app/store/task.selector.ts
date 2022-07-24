import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const getSpinnerState = createFeatureSelector<TaskState>('tasks');

export const getTasks = createSelector(
  getSpinnerState,
  (state: TaskState) => state.tasks
);