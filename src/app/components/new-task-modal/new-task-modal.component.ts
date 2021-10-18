import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { Task } from 'src/app/models/task.model';
import { TaskStatus } from 'src/app/enums/task-progress.enum';
import { mergeMap, take } from 'rxjs/operators';

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.prepareNewTaskForm();
    this.appendCategories();
  }

  public prepareNewTaskForm(): void {
    this.addNewTask = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      finish: ['', Validators.required],
      category: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  public createNewTask(): void {
    this.hasSubmittedForm = true;
    if(this.addNewTask.valid === true) {
      this.taskService.getLastTaskId().pipe(
        mergeMap( (taskId: number) => this.taskService.addNewTask({
          id: (taskId + 1),
          title: this.addNewTask.get('name')?.value,
          description: this.addNewTask.get('description')?.value,
          finishDate: this.addNewTask.get('finish')?.value,
          stage: TaskStatus.Started,
          category: this.addNewTask.get('category')?.value,
          updatedAt: new Date().getTime(),
        }))
      ).subscribe();
      this.addNewTask.reset();
      this.hasSubmittedForm = false;
    }
  }

  public clearNewTaskForm(): void {
    this.addNewTask.reset();
  }

  public appendCategories(): void {
    this.taskCategory$ = this.taskService.getNewTaskCategories();
  }
}
