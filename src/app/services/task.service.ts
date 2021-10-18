import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APP_CONFIG } from '../app.config';
import { ICategory } from '../models/category.model';
import { AppConfig } from '../models/config.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfiguration: AppConfig
  ) {}

  public getNewTaskCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.appConfiguration.apiEndpoint + ':3000/categories');
  }

  public addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.appConfiguration.apiEndpoint + ':3000/tasks', task);
  }

  public getLastTaskId(): Observable<number> {
    return this.http.get<Task[]>(this.appConfiguration.apiEndpoint + ':3000/tasks').pipe(
      map(response => Math.max(...response.map(({id}) => id)))
    )
  }
}