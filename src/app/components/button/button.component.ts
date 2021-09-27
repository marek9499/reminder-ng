import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() theme: string;
  @Input() hiddenMobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public handleClick(event: any): void {
    this.onClick.emit(event);
  }
}
