import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { FormgroupComponent } from './components/formgroup/formgroup.component';
import { FormcolComponent } from './components/formcol/formcol.component';
import { FormlabelComponent } from './components/formlabel/formlabel.component';
import { NewCategoryModalComponent } from './components/new-category-modal/new-category-modal.component';
import { ContainerComponent } from './components/modal/container/container.component';
import { TitleComponent } from './components/modal/title/title.component';
import { SmallComponent } from './components/modal/small/small.component';
import { HighlightComponent } from './components/modal/highlight/highlight.component';
import { FooterComponent } from './components/modal/footer/footer.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatIconModule } from '@angular/material/icon'; 


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
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
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
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
  exports: [
    TaskItemComponent,
    NewTaskModalComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
