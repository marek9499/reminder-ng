import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { tap, switchMap, map } from 'rxjs/operators'
import { Task } from "../models/task.model";
import { TaskService } from "../services/task.service";
import { addTasks } from "./task.actions";

@Injectable()
export class TaskEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly taskService: TaskService
	){}

	fetchTasksStart$: any = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.fetchTasksStart$),
			tap(() => {
				console.log('fetchTasksStart')
			}),
			switchMap(() => {
				return this.taskService.getTasks().pipe(
					map((task: Task[]) => addTasks({ tasks: task }))
				)
			})
		);
	}, { dispatch: false })
}