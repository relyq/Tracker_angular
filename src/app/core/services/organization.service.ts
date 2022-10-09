import { HttpClient } from '@angular/common/http';
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

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.organizationsUrl);
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

  patchOrganization(organization: Organization): void {}

  deleteOrganization(id: string): Observable<Object> {
    return this.http.delete(this.organizationsUrl + '/' + id);
  }
}
