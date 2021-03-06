import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IconDefinition, faEllipsisV, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskStatus } from 'src/app/enums/task-progress.enum';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Output() onTaskRemove: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onTaskUpdateStatus = new EventEmitter();

  public finishDate: string | Moment;
  public finishDateDeadlineDays: string | Moment;
  public faEllipsisV: IconDefinition = faEllipsisV;
  public faClock: IconDefinition = faClock;
  public faTick: IconDefinition = faCheckCircle;
  public TaskStatus = TaskStatus;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.task.currentValue) {
      const currentTask = changes.task.currentValue;
      this.finishDate = moment(currentTask.finishDate).format("Do MMM");
      this.finishDateDeadlineDays = moment(currentTask.finishDate).endOf('day').fromNow(); 
    }
  }

  public deleteTask(taskId: number): void {
    this.taskService
      .deleteTask(taskId)
      .pipe(take(1))
      .subscribe((resp: Task) => this.onTaskRemove.emit(resp));
  }

  public setTaskFinished(task: Task): void {
    this.taskService
      .markTaskStatusAs(task, TaskStatus.COMPLETED)
      .pipe(take(1))
      .subscribe((resp: Task) => this.task.stage = resp.stage);
  }
}
