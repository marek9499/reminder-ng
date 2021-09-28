import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/enums/modal.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {
  public modalIdentifier: string = Modal.NewTask;
  public addNewTask: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.prepareNewTaskForm();
  }

  public prepareNewTaskForm(): void {
    this.addNewTask = this.formBuilder.group({
      name: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator]
    });
  }

}
