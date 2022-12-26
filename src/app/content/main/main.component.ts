import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Task } from "src/app/models/task.model";
import { LoadTasks } from "src/app/store/task.actions";
import { TaskState } from "src/app/store/task.reducer";
import { getDisplayMode, getTasksBy } from "./../../store/task.selector";
import { tap } from "rxjs/operators";
import { TaskStatusStage } from "src/app/enums/task-progress.enum";
import { TaskItemComponent } from "../../modules/shared/components/task-item/task-item.component";
import { CommonModule } from "@angular/common";
import { NewTaskModalComponent } from "src/app/modules/shared/components/new-task-modal/new-task-modal.component";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"],
	standalone: true,
	imports: [CommonModule, NewTaskModalComponent, TaskItemComponent],
})
export class MainComponent implements OnInit {
	public tasks$: Observable<Task[] | null>;
	private _currentTaskDisplayStage$: Observable<TaskStatusStage> =
		this.store.pipe(select(getDisplayMode));

	constructor(private readonly store: Store<TaskState>) {}

	ngOnInit(): void {
		this.store.dispatch(LoadTasks());
		this._currentTaskDisplayStage$.subscribe(
			(showByStage: TaskStatusStage) => {
				this.tasks$ = this.store.pipe(select(getTasksBy(showByStage)));
			}
		);
	}
}
