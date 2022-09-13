import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7004/api/auth';

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

  test(): Observable<Object> {
    return this.http.get(this.authUrl);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  // i should prob use jwthelper instead of recording the exp time
  // actually token exp can be spoofed so this should be checked by the server
  isLoggedIn(): boolean {
    let exp = localStorage.getItem('exp');
    if (exp) {
      return new Date() < new Date(exp + ' UTC');
    }
    return false;
  }
}
