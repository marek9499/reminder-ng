import { Component, OnInit } from '@angular/core';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public faCalendar: IconDefinition = faCalendar;
  public searchForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  public prepareForm(): void {
    this.searchForm = this.formBuilder.group({
      searchTodoName: ['heellooo!!', Validators.nullValidator]
    });
  }

}
