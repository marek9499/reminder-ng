import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";
import { TaskActionTypes } from "./task.types";

export const LoadTasks = createAction(TaskActionTypes.LOAD);

export const LoadTasksSuccess = createAction(
	TaskActionTypes.LOAD_SUCCESS,
	props<{ data: Task[] }>()
);

export const RemoveTask = createAction(
	TaskActionTypes.REMOVE,
	props<{ id: number }>()
);

export const RemoveTaskSuccess = createAction(
	TaskActionTypes.REMOVE_SUCCESS,
	props<{ id: number }>()
);