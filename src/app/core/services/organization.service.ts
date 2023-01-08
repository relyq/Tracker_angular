import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';
import { User } from '../models/user';
import { baseUrl } from 'src/app/shared/components/globals';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private organizationsUrl = baseUrl + '/api/organizations';

  constructor(private http: HttpClient) {}

  getOrganizations(
    limit?: number,
    offset?: number,
    filter?: string,
    sort?: string
  ): Observable<any> {
    let params = new HttpParams();

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

    return this.http.get(this.organizationsUrl, { params: params });
  }

  getOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(this.organizationsUrl + '/' + id);
  }

  getOrganizationUsers(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.organizationsUrl + '/' + id + '/users');
  }

  postOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.organizationsUrl, organization);
  }

  putOrganization(organization: Organization): Observable<Organization> {
    return this.http.put<Organization>(
      this.organizationsUrl + '/' + organization.id,
      organization
    );
  }

  addUser(
    organizationId: string,
    userEmail: string,
    role: string
  ): Observable<User> {
    return this.http.post<User>(
      this.organizationsUrl + '/' + organizationId + '/users/' + userEmail,
      { role }
    );
  }

  removeUser(organizationId: string, userEmail: string): Observable<Object> {
    return this.http.delete(
      this.organizationsUrl + '/' + organizationId + '/users/' + userEmail
    );
  }

  patchOrganization(organization: Organization): void {}

  deleteOrganization(id: string): Observable<Object> {
    return this.http.delete(this.organizationsUrl + '/' + id);
  }
}
