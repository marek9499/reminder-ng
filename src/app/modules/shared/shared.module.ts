import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { FormlabelComponent } from './components/formlabel/formlabel.component';
import { NewCategoryModalComponent } from './components/new-category-modal/new-category-modal.component';
import { FooterComponent } from './components/modal/footer/footer.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    NewTaskModalComponent,
    FormlabelComponent,
    NewCategoryModalComponent,
    FooterComponent,
    InfoBoxComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxSmartModalModule.forRoot(),
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    TaskItemComponent,
    NewTaskModalComponent,
    HeaderComponent,
    SidebarComponent,
    MaterialModule
  ]
})
export class SharedModule { }
