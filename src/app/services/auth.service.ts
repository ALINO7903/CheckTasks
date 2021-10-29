import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterRequest } from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, request);
  }

  logout(): Observable<{ esito: boolean; }> {
    return this.http.get<{ esito: boolean; }>(`${environment.apiUrl}/logout`);
  }

  register(request: RegisterRequest): Observable<{ esito: boolean; }> {
    return this.http.post<{ esito: boolean; }>(`${environment.apiUrl}/register`, request);
  }

  checkToken(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${environment.apiUrl}/checkToken`);
  }
}
