import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7004/api/auth';

  public trackerOrg = 'fdda922d-84a8-48b6-b59c-7dd694929ee5';
  public adminRole = 'Administrator';
  public devRole = 'Developer';
  public userRole = 'User';

  public deletedUser = 'cce934fe-7a48-4896-ab20-b7da481c85c8';

  public rolesClaim =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  public nameIdentifierClaim =
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  public emailClaim =
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
  public userIdClaim = 'UserID';
  public organizationIdClaim = 'OrganizationID';

  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // should return jwt
  login(email: string, password: string): Observable<Object> {
    return this.http.post(this.authUrl + '/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', (res as any).jwt);
      }),
      shareReplay()
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getInfo(): any {
    let token = localStorage.getItem('token');
    if (token) {
      return this.helper.decodeToken(token);
    }
    return null;
  }

  getRoles(): string[] {
    let token = this.getInfo();
    return token[this.rolesClaim];
  }

  getOrganization(): string {
    let token = this.getInfo();
    return token[this.organizationIdClaim];
  }

  // actually token exp can be spoofed so this should be checked by the server
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      return !this.helper.isTokenExpired(token);
    }
    return false;
  }

  isRole(role: string): boolean {
    let token = this.getInfo();
    let rolesClaim = token[this.rolesClaim];

    if (rolesClaim.includes(role)) {
      return true;
    }
    return false;
  }

  inOrganization(organizationId: string): boolean {
    let token = this.getInfo();
    let organizationClaim = token[this.organizationIdClaim];

    if (organizationClaim === organizationId) {
      return true;
    }
    return false;
  }
}
