import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { DisplayMode } from '../enums/display-mode.enum';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  displayMode: DisplayMode;
}

export const initialState: TaskState = {
  tasks: [],
  displayMode: DisplayMode.RECENT
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
  })),
  on(TaskActions.AddTaskSuccess, (state, action): TaskState => ({
    ...state,
    tasks: [...state.tasks, action.addedTask]
  })),
  on(TaskActions.EditTaskStageSuccess, (state, action): TaskState => {
    const modifiedArrayData: Task[] = [...state.tasks].map((task: Task) => {
      if (task.id === action.id) {
        task = { ...task, stage: action.stage };
      }
      return task;
    })

    return {
      ...state,
      tasks: modifiedArrayData
    }
  }),
  on(TaskActions.ChangeTaskDisplayMode, (state, action): TaskState => ({
    ...state,
    tasks: state.tasks,
    displayMode: action.mode
  }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return tasksReducer(state, action);
}