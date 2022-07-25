import { Component } from '@angular/core';
import { IconDefinition, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { DisplayMode } from 'src/app/enums/display-mode.enum';
import { ChangeTaskDisplayMode } from 'src/app/store/task.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public checkIcon: IconDefinition = faCheckCircle;
  public isActive$: Observable<boolean> = this.sidebarService.getSidebarState();
  public DisplayMode = DisplayMode;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly store: Store<TaskState>
  ) { }

  public changeTaskState(state: DisplayMode): void {
    this.store.dispatch(ChangeTaskDisplayMode({ mode: state }))
  }
}

