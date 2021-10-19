import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition, faCalendarDay, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SidebarService } from 'src/app/services/sidebar.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Modal } from 'src/app/enums/modal.enum';

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
  public sidebarState: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sidebarService: SidebarService,
    private readonly modal: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.prepareSearchForm();
    setTimeout(() => {
      //this.modal.getModal(Modal.NewTask).open();
    }, 0);
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
    this.sidebarState = !this.sidebarState;
    this.sidebarService.changeState({ state: this.sidebarState });
  }

  public createNewTask(): void {
    this.modal.getModal(Modal.NewTask).open();
  }
}
