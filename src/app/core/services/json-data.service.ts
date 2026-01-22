import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { GlobalErrorService } from './global-error.service';

@Injectable({ providedIn: 'root' })
export class JsonDataService {
  private readonly api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.api}/users`);
  // }
  getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.api}/users`).pipe(
    catchError(err => {
      inject(GlobalErrorService).handle(err);
      return EMPTY; // component gets empty array → silent fail
    })
  );
}
  getProtectedData(): Observable<any> {
  return this.http.get(`${this.api}/protected`);
}
}