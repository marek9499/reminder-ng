import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";
import { TaskActionTypes } from "./task.types";

export const fetchTasks = createAction(TaskActionTypes.FETCH);
export const addTasks = createAction(
	TaskActionTypes.ADD,
	props<{ tasks: Task[] }>()
);