import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDefinition, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';
import { ShowTasksByStage } from 'src/app/store/task.actions';
import { getTasksByStageLength } from 'src/app/store/task.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public checkIcon: IconDefinition = faCheckCircle;
  public isActive$: Observable<boolean> = this.sidebarService.getSidebarState();
  public TaskStage = TaskStatusStage;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly store: Store<TaskState>
  ) { }

  public showTasksByStage(stage: TaskStatusStage): void {
    this.store.dispatch(ShowTasksByStage({ mode: stage }))
  }

  public getTaskStageLength(stage: TaskStatusStage): Observable<number> {
    console.log('calling!');
    this.store.pipe(select(getTasksByStageLength(stage))).subscribe(resp => {
      console.log(resp)
    })
    return this.store.pipe(select(getTasksByStageLength(stage)))
  }
}

