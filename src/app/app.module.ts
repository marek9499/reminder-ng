import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, TODO_CONFIG } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './store/task.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskService } from './services/task.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    StoreModule.forRoot({ todoApp: reducer }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({
      name: 'NgRX TodoApp',
    }),
  ],
  providers: [{ provide: APP_CONFIG, useValue: TODO_CONFIG }, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
