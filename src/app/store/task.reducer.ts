import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { TaskStatusStage } from '../enums/task-progress.enum';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  showByStage: TaskStatusStage;
}

export const initialState: TaskState = {
  tasks: [],
  showByStage: TaskStatusStage.RECENT
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
  on(TaskActions.ShowTasksByStage, (state, action): TaskState => ({
    ...state,
    showByStage: action.mode
  }))
);

export function reducer(state: TaskState | undefined, action: Action) {
  return tasksReducer(state, action);
}