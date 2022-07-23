import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public tasks$: Observable<Task[]> = this.taskService.getTasks();

  constructor(private readonly taskService: TaskService) { }

  public updateTaskList(action: string, task: Task): void {
    if(action === 'onRemove') {
      this.tasks$ = this.tasks$.pipe(map((tasks: Task[]) => {
        return tasks.filter((taskFiltered: Task) => taskFiltered.id !== task.id)
      }));
    } else if(action === 'onAdd') {
      this.tasks$ = this.tasks$.pipe(map((tasks: Task[]) => {
        return [...tasks, task];
      }))
    }
  }
}
