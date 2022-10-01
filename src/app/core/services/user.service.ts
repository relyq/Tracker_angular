import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://localhost:7004/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
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
}
