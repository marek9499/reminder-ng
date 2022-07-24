import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { fetchTasks, addTasks } from './task.actions';

export interface TaskState {
  tasks: Task[] | null;
}

export const initialState: TaskState = {
  tasks: null
}

export const tasksReducer = createReducer<TaskState>(
  initialState,
  on(fetchTasks, (state, action): TaskState => {
    return {
      ...state,
      tasks: []
    }
  }),
  on(addTasks, (state, { tasks }): TaskState => {
    return {
      ...state,
      tasks: tasks
    }
  })
);