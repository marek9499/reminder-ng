import { createAction, props } from '@ngrx/store';
import { TaskStatusStage } from '../enums/task-progress.enum';
import { IOption } from '../models/option.model';
import { Task } from '../models/task.model';
import { TaskActionTypes } from './task.types';

export const LoadTasks = createAction(TaskActionTypes.LOAD_TASKS);

export const LoadTasksSuccess = createAction(
  TaskActionTypes.LOAD_TASKS_SUCCESS,
  props<{ data: Task[] }>()
);

export const RemoveTask = createAction(
  TaskActionTypes.REMOVE_TASK,
  props<{ id: number }>()
);

export const RemoveTaskSuccess = createAction(
  TaskActionTypes.REMOVE_TASK_SUCCESS,
  props<{ id: number }>()
);

export const AddTask = createAction(
  TaskActionTypes.ADD_TASK,
  props<{ task: Partial<Task> }>()
);

export const AddTaskSuccess = createAction(
  TaskActionTypes.ADD_TASK_SUCCESS,
  props<{ addedTask: Task }>()
);

export const EditTaskStage = createAction(
  TaskActionTypes.EDIT_TASK,
  props<{ id: number; stage: TaskStatusStage }>()
);

export const EditTaskStageSuccess = createAction(
  TaskActionTypes.EDIT_TASK_SUCCESS,
  props<{ id: number; stage: TaskStatusStage }>()
);

export const ShowTasksByStage = createAction(
  TaskActionTypes.CHANGE_TASKS_DISPLAY_MODE,
  props<{ mode: TaskStatusStage }>()
);

export const LoadCategories = createAction(TaskActionTypes.LOAD_CATEGORIES);

export const LoadCategoriesSuccess = createAction(
  TaskActionTypes.LOAD_CATEGORIES_SUCCESS,
  props<{ data: IOption[] }>()
);

export const TogglePriority = createAction(
  TaskActionTypes.TOGGLE_PRIORITY,
  props<{ id: number; priority: boolean }>()
);

export const TogglePrioritySuccess = createAction(
  TaskActionTypes.TOGGLE_PRIORITY_SUCCESS,
  props<{ id: number; priority: boolean }>()
);
