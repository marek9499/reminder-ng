import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition, faCalendarDay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public faCalendar: IconDefinition = faCalendarDay;
  public faSearch: IconDefinition = faSearch;
  public searchForm: FormGroup;
  public currentDate: Date = new Date();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sidebarService: SharedService
    ) { }

  ngOnInit(): void {
    this.prepareSearchForm();
  }

  public prepareSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      searchTodoName: ['', Validators.nullValidator]
    });
  }

  public searchForTasks(): void {
    console.log('event...');
  }

  public runSidebar(): void {
    this.sidebarService.isSidebarActive.next(true);
  }
}
