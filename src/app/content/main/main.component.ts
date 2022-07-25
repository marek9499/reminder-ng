import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisplayMode } from 'src/app/enums/display-mode.enum';
import { Task } from 'src/app/models/task.model';
import { LoadTasks } from 'src/app/store/task.actions';
import { TaskState } from 'src/app/store/task.reducer';
import { getDisplayMode, getRecentTasks, getStartedTasks } from './../../store/task.selector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public tasks$: Observable<Task[] | null>;
  private _taskDisplayMode$: Observable<DisplayMode> = this.store.pipe(select(getDisplayMode)); 

  constructor(private readonly store: Store<TaskState>) {}

  ngOnInit(): void {
    this.store.dispatch(LoadTasks());
    this._taskDisplayMode$.pipe(
      tap((mode: DisplayMode) => {
        if (mode === DisplayMode.RECENT) {
          this.tasks$ = this.store.pipe(select(getRecentTasks))
        } else if (mode === DisplayMode.STARTED) {
          this.tasks$ = this.store.pipe(select(getStartedTasks))
        }
      })
    ).subscribe();
  }
}
