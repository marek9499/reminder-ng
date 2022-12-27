import { Component } from '@angular/core';
import {
  IconDefinition,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';
import { ShowTasksByStage } from 'src/app/store/task.actions';
import { TaskStageLengthPipe } from '../../pipes/taskStageLength.pipe';
import { CommonModule } from '@angular/common';
import { Tabs } from 'src/app/models/tabs.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, TaskStageLengthPipe],
})
export class SidebarComponent {
  public checkIcon: IconDefinition = faCheckCircle;
  public isActive$: Observable<boolean> = this.sidebarService.getSidebarState();

  public tabs: Tabs[] = [
    {
      name: 'Recent',
      stage: TaskStatusStage.RECENT,
    },
    {
      name: 'High priority',
      stage: TaskStatusStage.HIGH_PRIORITY,
    },
    {
      name: 'Todo',
      stage: TaskStatusStage.TODO,
    },
    {
      name: 'In progress',
      stage: TaskStatusStage.IN_PROGRESS,
    },
    {
      name: 'Completed',
      stage: TaskStatusStage.COMPLETED,
    },
  ];

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly store: Store<TaskState>
  ) {}

  public showTasksByStage(stage: TaskStatusStage): void {
    this.store.dispatch(ShowTasksByStage({ mode: stage }));
  }
}
