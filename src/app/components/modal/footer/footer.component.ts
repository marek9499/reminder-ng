import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'modal-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() align: string;

  constructor() { }

  ngOnInit(): void {
  }

}
