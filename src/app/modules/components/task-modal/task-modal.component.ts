import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { Task } from 'src/app/models/task.model';
import { IOption } from 'src/app/models/option.model';
import { select, Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { AddTask, LoadCategories } from 'src/app/store/task.actions';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';
import { getTasksCategories } from 'src/app/store/task.selector';
import { InputComponent } from '../input/input.component';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { MaterialModule } from '../../material/material.module';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { NewCategoryModalComponent } from '../new-category-modal/new-category-modal.component';

@Component({
  selector: 'task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    InfoBoxComponent,
    ReactiveFormsModule,
    //NgxSmartModalModule,
    MaterialModule,
    ButtonComponent,
    NewCategoryModalComponent,
  ],
})
export class TaskModalComponent implements OnInit {
  public modalIdentifier: Modal = Modal.NewTask;
  public addNewTaskForm: FormGroup;
  public taskCategories$: Observable<IOption[]> = this.store.pipe(
    select(getTasksCategories)
  );
  public hasSubmittedForm: boolean = false;
  public isNewTaskAdded: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<TaskState>
  ) //private readonly modal: NgxSmartModalService
  {}

  ngOnInit(): void {
    this._initForm();
    this.store.dispatch(LoadCategories());
  }

  private _initForm(): void {
    this.addNewTaskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.nullValidator]],
      finishDay: ['', Validators.nullValidator],
      finishHour: ['', Validators.nullValidator],
      category: ['', [Validators.nullValidator]],
      important: [null, [Validators.required]],
    });
  }

  public submitCreateNewTask(): void {
    this.hasSubmittedForm = true;
    if (!this.addNewTaskForm.valid) {
      return;
    }

    const newTaskPayload: Partial<Task> = {
      title: this.getControl('name').value,
      description: this.getControl('description').value,
      finishDay: this.getControl('finishDay').value ?? null,
      finishHour: this.getControl('finishHour').value,
      stage: TaskStatusStage.TODO,
      category: this.getControl('category').value,
      updatedAt: new Date().getTime(),
      isImportant: this.getControl('important').value,
    };

    this.store.dispatch(AddTask({ task: newTaskPayload }));
  }

  public clearTaskForm(): void {
    this.addNewTaskForm.reset();
    this.isNewTaskAdded = false;
  }

  public openNewTaskCategoryModal(): void {
    //this.modal.getModal(Modal.NewCategory).open();
  }

  public getControl(name: string): FormControl {
    return this.addNewTaskForm.get(name) as FormControl;
  }

  public handleCloseModal(): void {
    this.addNewTaskForm.reset();
    this.hasSubmittedForm = false;
    this.isNewTaskAdded = false;
  }
}
