import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public checkIcon: IconDefinition = faCheckCircle;
  public isActive$: Observable<boolean>;

  constructor(private readonly sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.isActive$ = this.sidebarService.getSidebarState();
  }

}

