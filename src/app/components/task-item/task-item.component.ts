import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition, faEllipsisV, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TaskItemComponent implements OnInit {
  public faEllipsisV: IconDefinition = faEllipsisV;
  public faClock: IconDefinition = faClock;
  public faTick: IconDefinition = faCheckCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
