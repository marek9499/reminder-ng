import { Component, Input, OnInit } from '@angular/core';
import { TaskStatus } from 'src/app/enums/task-progress.enum';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() status: TaskStatus;
  constructor() { }

  ngOnInit(): void {
  }

}
