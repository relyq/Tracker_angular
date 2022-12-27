import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/shared/components/globals';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = baseUrl + '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(
    organizationId: string,
    all?: boolean,
    limit?: number,
    offset?: number,
    filter?: string
  ): Observable<User[]> {
    let params = new HttpParams()
      .set('organizationid', organizationId)
      .set('all', all ? true : false);

    if (limit) {
      params.set('limit', limit);
    }
    if (offset) {
      params.set('offset', offset);
    }
    if (filter) {
      params.set('filter', filter);
    }

    return this.http.get<User[]>(this.usersUrl, { params: params });
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + userId);
  }

  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/email/' + userEmail);
  }

  postUser(user: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  deleteUser(userId: string): Observable<Object> {
    return this.http.delete(this.usersUrl + '/' + userId);
  }

  passwordReset(): Observable<Object> {
    return this.http.post(this.usersUrl + '/passwordreset', null);
  }
}
