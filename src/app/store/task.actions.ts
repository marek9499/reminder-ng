import { createAction, props } from "@ngrx/store";
import { TaskStatusStage } from "../enums/task-progress.enum";
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

export const AddTask = createAction(
	TaskActionTypes.ADD,
	props<{ task: Partial<Task> }>()
);

export const AddTaskSuccess = createAction(
	TaskActionTypes.ADD_SUCCESS,
	props<{ addedTask: Task }>()
);

export const EditTaskStage = createAction(
	TaskActionTypes.EDIT,
	props<{ id: number, stage: TaskStatusStage }>()
);

export const EditTaskStageSuccess = createAction(
	TaskActionTypes.EDIT_SUCCESS,
	props<{ id: number, stage: TaskStatusStage }>()
);

export const ShowTasksByStage = createAction(
	TaskActionTypes.CHANGE_DISPLAY_MODE,
	props<{ mode: TaskStatusStage }>()
);