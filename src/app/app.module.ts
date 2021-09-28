import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { MainComponent } from './content/main/main.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    MainComponent,
    NewTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
