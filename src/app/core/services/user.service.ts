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
    filter?: string,
    sort?: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('organizationid', organizationId)
      .set('all', all ? true : false);

    if (limit) {
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset);
    }
    if (filter) {
      params = params.set('filter', filter);
    }
    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get(this.usersUrl, { params: params });
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + userId);
  }

  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/email/' + userEmail);
  }

  postUser(user: {
    email: string;
    password: string;
    baseUrl: string;
  }): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  putUser(
    userId: string,
    userUpdate: { firstName?: string; lastName?: string; phoneNumber?: string }
  ): Observable<User> {
    return this.http.put<User>(this.usersUrl + '/' + userId, userUpdate);
  }

  deleteUser(userId: string): Observable<Object> {
    return this.http.delete(this.usersUrl + '/' + userId);
  }

  passwordReset() {
    return this.http.post(this.usersUrl + '/passwordreset', location.host, {
      observe: 'response'
    });
  }
}
