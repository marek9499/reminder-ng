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
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID } from '@angular/core';
import { MainComponent } from './content/main/main.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormgroupComponent } from './components/formgroup/formgroup.component';
import { FormcolComponent } from './components/formcol/formcol.component';
import { FormlabelComponent } from './components/formlabel/formlabel.component';
import { APP_CONFIG, TODO_CONFIG } from './app.config';
import { NewCategoryModalComponent } from './components/new-category-modal/new-category-modal.component';
import { ContainerComponent } from './components/modal/container/container.component';
import { TitleComponent } from './components/modal/title/title.component';
import { SmallComponent } from './components/modal/small/small.component';
import { HighlightComponent } from './components/modal/highlight/highlight.component';
import { FooterComponent } from './components/modal/footer/footer.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon'; 
registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    MainComponent,
    NewTaskModalComponent,
    FormgroupComponent,
    FormcolComponent,
    FormlabelComponent,
    NewCategoryModalComponent,
    ContainerComponent,
    TitleComponent,
    SmallComponent,
    HighlightComponent,
    FooterComponent,
    InfoBoxComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pl" },
    { provide: APP_CONFIG, useValue: TODO_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
