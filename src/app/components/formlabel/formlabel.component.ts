import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-label',
  templateUrl: './formlabel.component.html',
  styleUrls: ['./formlabel.component.scss']
})
export class FormlabelComponent {
  @Input() for: string;
  @Input() control: AbstractControl | null;
}
