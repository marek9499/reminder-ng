import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import {
	ControlValueAccessor,
	NgControl,
	NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NgxSmartModalService } from "ngx-smart-modal";
import { IOption } from "src/app/models/option.model";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material/material.module";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		},
	],
	standalone: true,
	imports: [
		CommonModule,
		MaterialModule,
		FontAwesomeModule,
		NgxMaterialTimepickerModule,
	],
})
export class InputComponent implements ControlValueAccessor, OnInit {
	@Input() type: string;
	@Input() icon: IconDefinition;
	@Input() placeholder: string;
	@Input() identifier: string;
	@Input() isFormSubmitted: boolean = false;
	@Input() options: IOption[] | null;

	public value: string;
	public onChange: (value: any) => void;
	public onTouched: () => void;
	public disabled: boolean;
	public ngControl: NgControl;

	constructor(
		private readonly injector: Injector,
		private readonly modal: NgxSmartModalService
	) {}

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

	public writeInputData(event: any): void {
		this.onChange(event);
		this.writeValue(event);
	}
}
