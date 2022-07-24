import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskStatus } from 'src/app/enums/task-progress.enum';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent implements OnInit {
  @Input() status: string;
  constructor() { }

  ngOnInit(): void {
  }

}
