import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TypedAction } from "@ngrx/store/src/models";
import { Observable } from "rxjs";
import { tap, switchMap, map } from 'rxjs/operators'
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import * as TaskActions from "./task.actions";
import { TaskActionTypes } from "./task.types";

@Injectable()
export class TaskEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly taskService: TaskService
	){}

	private readonly fetchTasksStart$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(TaskActions.LoadTasks),
			switchMap(() => this.taskService.getTasks()),
			map((data: Task[]) => TaskActions.LoadTasksSuccess({ data }))
		);
	});

	private readonly removeTask$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(TaskActions.RemoveTask),
			switchMap(({id}) => {
				return this.taskService.deleteTask(id).pipe(
					map(() => id)
				)
			}),
			map((removedTaskId: number) => TaskActions.RemoveTaskSuccess({ id: removedTaskId }))
		);
	});

	private readonly addTask$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(TaskActions.AddTask),
			switchMap(({task}) => this.taskService.addNewTask(task)),
			map((newTask: Task) => TaskActions.AddTaskSuccess({ addedTask: newTask }))
		)
	});

	private readonly editTaskStage$: Observable<any> = createEffect(() => {
		return this.actions$.pipe(
			ofType(TaskActions.EditTaskStage),
			switchMap(({id, stage}) => {
				return this.taskService.markTaskStatusAs(id, stage).pipe(
					map((task: Task) => {
						return { taskId: task.id, stage: stage }
					})
				)
			}),
			map(({taskId, stage}) => TaskActions.EditTaskStageSuccess({ id: taskId, stage: stage }))
		)
	});
}