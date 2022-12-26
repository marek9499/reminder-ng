import { CommonModule } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from "@angular/core";

@Component({
	selector: "app-badge",
	templateUrl: "./badge.component.html",
	styleUrls: ["./badge.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
})
export class BadgeComponent {
	@Input() status: string;
	constructor() {}
}
