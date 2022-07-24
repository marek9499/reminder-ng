import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { LoadTasks } from 'src/app/store/task.actions';
import { TaskState } from 'src/app/store/task.reducer';
import { getTasks } from './../../store/task.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public tasks$: Observable<Task[] | null> = this.store.pipe(select(getTasks))

  constructor(private readonly store: Store<TaskState>) {}

  ngOnInit(): void {
    this.store.dispatch(LoadTasks());
  }

  public updateTaskList(action: string, taskId: number): void {
    // if(action === 'onRemove') {
    //   this.tasks$ = this.tasks$.pipe(map((tasks: Task[]) => {
    //     return tasks.filter((taskFiltered: Task) => taskFiltered.id !== task.id)
    //   }));
    // } else if(action === 'onAdd') {
    //   this.tasks$ = this.tasks$.pipe(map((tasks: Task[]) => {
    //     return [...tasks, task];
    //   }))
    // }
    //TODO: Implementacja dodawania w storze ;d
  }
}
