import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IconDefinition, faEllipsisV, faClock, faCheckCircle, faFlag, faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { EditTaskStage, RemoveTask } from 'src/app/store/task.actions';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Output() onTaskUpdateStatus = new EventEmitter();

  public finishDate: string | Moment;
  public finishDateDeadlineDays: string | Moment;
  public faEllipsisV: IconDefinition = faEllipsisV;
  public faClock: IconDefinition = faClock;
  public faTick: IconDefinition = faCheckCircle;
  public faFlag: IconDefinition = faFlag;
  public faFontAwesome: IconDefinition = faFontAwesome;
  public isImportantTaskIcon: boolean;
  public TaskStatusStage = TaskStatusStage;

  constructor(
    private readonly store: Store<TaskState>
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.task.currentValue) {
      const currentTask = changes.task.currentValue;
      this.finishDate = moment(currentTask.finishDate).format("Do MMM");
      this.finishDateDeadlineDays = moment(currentTask.finishDate).endOf('day').fromNow();
      this.isImportantTaskIcon = changes.task.currentValue.isImportant ? true : false;
    }
  }

  public editTaskStage(taskId: number, stage: TaskStatusStage): void {
    this.store.dispatch(EditTaskStage({ id: taskId, stage: stage }))
  }

  public removeTask(id: number): void {
    this.store.dispatch(
      RemoveTask({
        id: id
      })
    );
  }
}
