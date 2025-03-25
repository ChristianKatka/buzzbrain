import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthCredentials } from '../models/auth-credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(
      `${environment.authApiBaseUrl}/auth/login`,
      credentials
    );
  }

  register(credentials: AuthCredentials): Observable<any> {
    return this.http.post(
      `${environment.authApiBaseUrl}/auth/register`,
      credentials
    );
  }

  refreshTokens(refreshToken: string): Observable<any> {
    return this.http.post(`${environment.authApiBaseUrl}/auth/refresh-tokens`, {
      refreshToken,
    });
  }

  logoutFromAllDevices() {}
}
