import { Pipe, PipeTransform } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TaskStatusStage } from "src/app/enums/task-progress.enum";
import { TaskState } from "src/app/store/task.reducer";
import { getTasksByStageLength } from "src/app/store/task.selector";

@Pipe({
	name: "taskStageLength",
	standalone: true,
})
export class TaskStageLengthPipe implements PipeTransform {
	constructor(private readonly store: Store<TaskState>) {}

	transform(value: TaskStatusStage): Observable<number> {
		return this.store.pipe(select(getTasksByStageLength(value)));
	}
}
