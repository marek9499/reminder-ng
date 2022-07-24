import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, switchMap, map } from 'rxjs/operators'
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import * as TaskActions from "./task.actions";

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
}