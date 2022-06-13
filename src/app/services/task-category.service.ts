import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOption } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public addedCategory$: BehaviorSubject<IOption | undefined> = new BehaviorSubject<IOption | undefined>(undefined);
  public initialCategories$: Subject<IOption[]> = new Subject<IOption[]>();
}
