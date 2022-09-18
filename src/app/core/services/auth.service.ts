import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7004/api/auth';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // should return jwt
  login(email: string, password: string): Observable<Object> {
    return this.http.post(this.authUrl + '/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', (res as any).jwt);
        localStorage.setItem('exp', (res as any).exp);
      }),
      shareReplay()
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  getInfo(): any {
    let token = localStorage.getItem('token');
    if (token) {
      return this.helper.decodeToken(token);
    }
    return null;
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
    let rolesClaim =
      token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (rolesClaim.includes(role)) {
      return true;
    }
    return false;
  }
}
