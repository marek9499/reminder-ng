import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { TaskStatus } from '../enums/task-progress.enum';
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

  public addNewCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.appConfiguration.apiEndpoint + ':3000/categories', category);
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.appConfiguration.apiEndpoint + ':3000/tasks');
  }

  public deleteTask(taskId: number | undefined): Observable<Task> {
    return this.http.delete<Task>(this.appConfiguration.apiEndpoint + `:3000/tasks/${taskId}`);
  }

  public markTaskStatusAs(taskPayload: Task, stageUpdateTo: TaskStatus): Observable<Task> {
    const updatePayload: Task = {
      ...taskPayload,
      stage: TaskStatus.Completed
    }
    return this.http.put(this.appConfiguration.apiEndpoint + `:3000/tasks/${updatePayload.id}`, updatePayload);
  }
}
