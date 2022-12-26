import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { APP_CONFIG, TODO_CONFIG } from "./app.config";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainComponent } from "./content/main/main.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/task.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TaskEffects } from "./store/task.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HeaderComponent } from "./modules/shared/components/header/header.component";
import { SidebarComponent } from "./modules/shared/components/sidebar/sidebar.component";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({ todoApp: reducer }),
		EffectsModule.forRoot([TaskEffects]),
		StoreDevtoolsModule.instrument({
			name: "NgRX TodoApp",
		}),
		MainComponent,
		SidebarComponent,
		HeaderComponent,
	],
	providers: [{ provide: APP_CONFIG, useValue: TODO_CONFIG }],
	bootstrap: [AppComponent],
})
export class AppModule {}
