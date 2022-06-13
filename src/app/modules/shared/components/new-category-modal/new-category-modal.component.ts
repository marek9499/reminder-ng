import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Modal } from 'src/app/enums/modal.enum';
import { IOption } from 'src/app/models/option.model';
import { CategoryService } from 'src/app/services/task-category.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'new-category-modal',
  templateUrl: './new-category-modal.component.html',
  styleUrls: ['./new-category-modal.component.scss']
})
export class NewCategoryModalComponent implements OnInit {
  public modalIdentifier: string = Modal.NewCategory;
  public addNewCategoryForm: FormGroup;
  public hasSubmittedForm: boolean = false;
  public hasCategoryAdded: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addNewCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  public addNewCategory(): void {
    this.hasSubmittedForm = true;
    const categoryData: IOption = {
      name: this.addNewCategoryForm.get('name')?.value,
      value: (this.addNewCategoryForm.get('name')?.value).toLowerCase()
    }
    this.taskService.addNewCategory(categoryData).pipe(take(1)).subscribe(resp => {
      this.categoryService.addedCategory$.next(categoryData);
      this.hasCategoryAdded = true;
    });
  }
}
