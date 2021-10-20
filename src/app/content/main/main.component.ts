import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public tasks$: Task[] = [];

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.prepareTasks();
  }

  public prepareTasks(): void {
    this.taskService.getTasks().subscribe(resp => this.tasks$ = resp);
  }

  public updateTaskList(action: string, task: Task): void {
    if(action === 'onRemove') {
      this.tasks$ = this.tasks$.filter(taskList => taskList.id !== task.id);
    } else if(action === 'onAdd') {
      this.tasks$.push(task);
    }
  }

}
