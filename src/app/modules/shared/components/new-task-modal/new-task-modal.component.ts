import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { BehaviorSubject, combineLatest, EMPTY, Observable, OperatorFunction, pipe, ReplaySubject, Subject, UnaryFunction } from 'rxjs';
import { TaskStatus } from 'src/app/enums/task-progress.enum';
import { filter, map, scan, startWith, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Task } from 'src/app/models/task.model';
import { IOption } from 'src/app/models/option.model';
import { CategoryService } from 'src/app/services/task-category.service'

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit, OnDestroy {
  @Output() onAddTask = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public modalIdentifier: Modal = Modal.NewTask;
  public addNewTaskForm: FormGroup;
  public taskInitialCategory$: Observable<IOption[]>;
  public taskCategoryData$: Observable<IOption[]> = this.taskCategoryData();
  public hasSubmittedForm: boolean = false;
  public isNewTaskAdded: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly modal: NgxSmartModalService,
    private readonly taskCategoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.addNewTaskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.nullValidator]],
      finishDay: ['', Validators.nullValidator],
      finishHour: ['', Validators.nullValidator],
      category: ['', [Validators.nullValidator]]
    });

    this.taskService
      .getNewTaskCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories: IOption[]) => this.taskCategoryService.initialCategories$.next(categories));
  }

  public submitCreateNewTask(): void {
    console.log('DEBUGGING: isValidForm?', this.addNewTaskForm);
    this.hasSubmittedForm = true;
    if(this.addNewTaskForm.valid === true) {
      const taskPayload: Task = {
        title: this.getControl('name').value,
        description: this.getControl('description').value,
        finishDay: this.getControl('finishDay').value ?? null,
        finishHour: this.getControl('finishHour').value,
        stage: TaskStatus.Started,
        category: this.getControl('category').value,
        updatedAt: new Date().getTime()
      };

      this.taskService
        .addNewTask(taskPayload)
        .pipe(take(1))
        .subscribe(resp => this.onAddTask.emit(resp));
      this.isNewTaskAdded = true;
    }
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

  public taskCategoryData(): Observable<IOption[]> {
    return combineLatest((
      [
        this.taskCategoryService.initialCategories$.pipe(startWith([])),
        this.taskCategoryService.addedCategory$.pipe(filter(Boolean), startWith([]))
      ])).pipe(map(([initial, added]: [IOption[], unknown]) => initial.concat(<IOption>added)))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}