import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { TaskStatus } from 'src/app/enums/task-progress.enum';
import { take } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {
  @Output() onAddTask = new EventEmitter();
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
      description: ['', [Validators.nullValidator]],
      finishDay: ['', Validators.nullValidator],
      finishHour: ['', Validators.nullValidator],
      category: ['', [Validators.nullValidator]]
    });
  }

  public submitCreateNewTask(): void {
    console.log(this.addNewTask.value);
    this.hasSubmittedForm = true;
    if(this.addNewTask.valid === true) {
      this.taskService.addNewTask(this.getTaskPayload()).pipe(take(1)).subscribe(resp => this.onAddTask.emit(resp));
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

  public getTaskPayload(): Task {
    const taskPayload: Task = {
      title: this.addNewTask.get('name')?.value,
      description: this.addNewTask.get('description')?.value,
      finishDate: this.addNewTask.get('finish')?.value,
      stage: TaskStatus.Started,
      category: this.addNewTask.get('category')?.value,
      updatedAt: new Date().getTime()
    }

    if(taskPayload.finishDate === "") {
      taskPayload.finishDate = null;
    }

    return taskPayload;
  }

  public handleCloseModal(): void {
    this.addNewTask.reset();
    this.hasSubmittedForm = false;
    this.isNewTaskAdded = false;
  }
}
