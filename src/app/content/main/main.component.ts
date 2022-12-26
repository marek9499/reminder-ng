import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { LoadTasks } from 'src/app/store/task.actions';
import { TaskState } from 'src/app/store/task.reducer';
import {
  getSelectedMenuType,
  getTasksBySelectedMenuType,
} from './../../store/task.selector';
import { switchMap } from 'rxjs/operators';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';
import { TaskItemComponent } from '../../modules/shared/components/task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { NewTaskModalComponent } from 'src/app/modules/shared/components/new-task-modal/new-task-modal.component';
import { SidebarComponent } from 'src/app/modules/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NewTaskModalComponent,
    TaskItemComponent,
    SidebarComponent,
    HeaderComponent,
  ],
})
export class MainComponent implements OnInit {
  public tasks$: Observable<Task[]> = this.store.pipe(
    select(getSelectedMenuType),
    switchMap((stage: TaskStatusStage) =>
      this.store.pipe(select(getTasksBySelectedMenuType(stage)))
    )
  );

  constructor(private readonly store: Store<TaskState>) {}

  ngOnInit(): void {
    this.store.dispatch(LoadTasks());
  }
}
