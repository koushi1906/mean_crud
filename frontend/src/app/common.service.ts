import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  private refreshDataSubject = new BehaviorSubject<boolean>(false);
  refreshData$ = this.refreshDataSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  triggerRefresh() {
    this.refreshDataSubject.next(true);
  }

  sendUserData(userData: any) {
    this.userDataSubject.next(userData);
  }
}
