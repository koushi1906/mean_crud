import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private url = 'http://localhost:8080/user/create';
  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any>{
    return this.http.post(this.url,user);
  }

  updateUser(userId: string, updatedUserData: any): Observable<any>{
    const url = `http://localhost:8080/user/update/${userId}`;
    return this.http.patch(url, updatedUserData);
  }
}
