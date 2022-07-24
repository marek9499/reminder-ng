import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
}

const tasksReducer = createReducer<TaskState>(
  initialState,
  on(TaskActions.LoadTasksSuccess, (state, action): TaskState => ({
    ...state,
    tasks: action.data
  })),
  on(TaskActions.RemoveTaskSuccess, (state, action): TaskState => ({
    ...state,
    tasks: state.tasks.filter((taskFiltered: Task) => taskFiltered.id !== action.id)
  }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return tasksReducer(state, action);
}