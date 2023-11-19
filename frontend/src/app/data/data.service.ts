import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) {}

  getVisitors(): Observable<any> {
    return this.http.get(this.url + 'getall');
  }

  deleteVisitor(id: string): Observable<any> {
    return this.http.delete(this.url + 'remove/' + id);
  }
}
