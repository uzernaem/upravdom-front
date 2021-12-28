import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'login/refresh', {
      refresh: token
    }, httpOptions);
  }

  register(username: string, email: string, password: string, password2: string, first_name: string, last_name: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
      password2,
      first_name,
      last_name
    }, httpOptions);
  }
}