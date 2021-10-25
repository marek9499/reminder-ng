import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { Modal } from 'src/app/enums/modal.enum';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type: string;
  @Input() icon: IconDefinition;
  @Input() placeholder: string;
  @Input() identifier: string;
  @Input() isFormSubmitted: boolean = false;
  @Input() taskCategories$: Observable<ICategory[]>;
  
  public value: string;
  public onChange: (value: any) => void;
  public onTouched: () => void;
  public disabled: boolean;
  public ngControl: NgControl;

  constructor(
    private readonly injector: Injector,
    private readonly modal: NgxSmartModalService) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }


  public changedInput(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.onChange(value);
  }
  
  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isBoolean: false): void {
    this.disabled = isBoolean;
  }

  public updateTime(event: string): void {
    this.onChange(event);
    this.writeValue(event);
  }

  public updateDate(event: MatSelectChange): void {
    this.onChange(event.value);
    this.writeValue(event.value);
  }

  public createNewTaskCategory(): void {
    this.modal.getModal(Modal.NewCategory).open();
  }
}
