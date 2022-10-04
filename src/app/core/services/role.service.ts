import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private rolesUrl = 'https://localhost:7004/api/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.rolesUrl);
  }
}
