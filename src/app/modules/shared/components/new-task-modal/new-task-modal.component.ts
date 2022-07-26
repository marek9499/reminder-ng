import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, take, takeUntil, tap } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Task } from 'src/app/models/task.model';
import { IOption } from 'src/app/models/option.model';
import { CategoryService } from 'src/app/services/task-category.service'
import { isTruthy } from 'src/app/utils/rx-functions';
import { Store } from '@ngrx/store';
import { TaskState } from 'src/app/store/task.reducer';
import { AddTask } from 'src/app/store/task.actions';
import { TaskStatusStage } from 'src/app/enums/task-progress.enum';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public modalIdentifier: Modal = Modal.NewTask;
  public addNewTaskForm: FormGroup;
  public taskInitialCategory$: Observable<IOption[]>;
  public taskCategories$: Observable<IOption[]> = this.getTaskCategoriesData();
  public hasSubmittedForm: boolean = false;
  public isNewTaskAdded: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<TaskState>,
    private readonly modal: NgxSmartModalService,
    private readonly taskCategoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.addNewTaskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.nullValidator]],
      finishDay: ['', Validators.nullValidator],
      finishHour: ['', Validators.nullValidator],
      category: ['', [Validators.nullValidator]],
      important: [null, [Validators.required]]
    });

    // this.taskService
    //   .getNewTaskCategories()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((categories: IOption[]) => this.taskCategoryService.initialCategories$.next(categories));
  }

  public submitCreateNewTask(): void {
    this.hasSubmittedForm = true;
    if(!this.addNewTaskForm.valid) {
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
      isImportant: this.getControl('important').value
    };

    this.store.dispatch(AddTask({ task: newTaskPayload }));
  }

  public clearTaskForm(): void {
    this.addNewTaskForm.reset();
    this.isNewTaskAdded = false;
  }

  public openNewTaskCategoryModal(): void {
    this.modal.getModal(Modal.NewCategory).open();
  }

  public getControl(name: string): FormControl {
    return this.addNewTaskForm.get(name) as FormControl;
  }

  public handleCloseModal(): void {
    this.addNewTaskForm.reset();
    this.hasSubmittedForm = false;
    this.isNewTaskAdded = false;
  }

  public getTaskCategoriesData(): Observable<IOption[]> {
    return combineLatest(([
      this.taskCategoryService.initialCategories$.pipe(startWith([])),
      this.taskCategoryService.addedCategory$.pipe(isTruthy(), startWith([]))
    ]))
    .pipe(map(([initial, added]: [IOption[], IOption | IOption[]]) => initial.concat(added)));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}