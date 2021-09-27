import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/services/shared.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public checkIcon: IconDefinition = faCheckCircle;
  public sidebarActive: boolean = false;

  constructor(private readonly sidebarService: SharedService) { }

  ngOnInit(): void {
    this.sidebarService.isSidebarActive.subscribe(message => {
      console.log('siemka!');
    })
  }

}

