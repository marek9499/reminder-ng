import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { TaskStatus } from 'src/app/enums/task-progress.enum';
import { mergeMap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {
  public modalIdentifier: string = Modal.NewTask;
  public addNewTask: FormGroup;
  public taskCategory$: Observable<ICategory[]>;
  public hasSubmittedForm: boolean = false;
  public isNewTaskAdded: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly modal: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.prepareNewTaskForm();
    this.appendCategories();
  }

  public prepareNewTaskForm(): void {
    this.addNewTask = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      finish: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  public createNewTask(): void {
    this.hasSubmittedForm = true;
    if(this.addNewTask.valid === true) {
      this.taskService.addNewTask({
        title: this.addNewTask.get('name')?.value,
        description: this.addNewTask.get('description')?.value,
        finishDate: this.addNewTask.get('finish')?.value,
        stage: TaskStatus.Started,
        category: this.addNewTask.get('category')?.value,
        updatedAt: new Date().getTime(),
      }).subscribe();
      this.hasSubmittedForm = false;
      this.isNewTaskAdded = true;
    }
  }

  public clearNewTaskForm(): void {
    this.addNewTask.reset();
    this.isNewTaskAdded = false;
  }

  public appendCategories(): void {
    this.taskCategory$ = this.taskService.getNewTaskCategories();
  }

  public createNewTaskCategory(): void {
    this.modal.getModal(Modal.NewCategory).open();
  }
}
