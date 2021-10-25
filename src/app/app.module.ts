import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, TODO_CONFIG } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './content/main/main.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: TODO_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
