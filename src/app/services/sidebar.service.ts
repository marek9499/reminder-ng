import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public subject: Subject<{ state: boolean }> = new Subject<{
    state: boolean;
  }>();

  public changeState(data: { state: boolean }): void {
    this.subject.next({ state: data.state });
  }

  public getSidebarState(): Observable<boolean> {
    return this.subject.asObservable().pipe(map((res) => res.state));
  }
}
