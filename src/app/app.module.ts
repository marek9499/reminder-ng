import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, TODO_CONFIG } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './content/main/main.component';
import { SharedModule } from './modules/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './store/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({ tasks: tasksReducer }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [
    { provide: APP_CONFIG, useValue: TODO_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
