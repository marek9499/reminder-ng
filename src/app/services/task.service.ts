import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { TaskStatusStage } from '../enums/task-progress.enum';
import { AppConfig } from '../models/config.model';
import { IOption } from '../models/option.model';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly appConfiguration: AppConfig
  ) {}

  public getNewTaskCategories(): Observable<IOption[]> {
    return this.http.get<IOption[]>(
      `${this.appConfiguration.apiEndpoint}/categories`
    );
  }

  public addNewTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(
      `${this.appConfiguration.apiEndpoint}/tasks`,
      task
    );
  }

  public addNewCategory(category: IOption): Observable<IOption> {
    return this.http.post<IOption>(
      `${this.appConfiguration.apiEndpoint}'/categories'`,
      category
    );
  }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.appConfiguration.apiEndpoint}/tasks`);
  }

  public deleteTask(taskId: number): Observable<Task> {
    return this.http.delete<Task>(
      `${this.appConfiguration.apiEndpoint}/tasks/${taskId}`
    );
  }

  public editProperty(
    id: number,
    property: string,
    value: unknown
  ): Observable<Task> {
    const updatePayload: Partial<Task> = {
      [property]: value,
    };

    return this.http.patch<Task>(
      `${this.appConfiguration.apiEndpoint}/tasks/${id}`,
      updatePayload
    );
  }

  public editStage(
    id: number,
    stageDestination: TaskStatusStage
  ): Observable<Task> {
    return this.editProperty(id, 'stage', stageDestination);
  }

  public editPriority(id: number, priority: boolean): Observable<Task> {
    return this.editProperty(id, 'isImportant', priority);
  }
}
