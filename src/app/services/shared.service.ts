import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isSidebarActive: Subject<boolean> = new Subject<boolean>();
  constructor() { }
}
