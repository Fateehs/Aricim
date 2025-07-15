import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isLoggedIn = false;
  private apiUrl = 'https://localhost:7033/api/auth';

  constructor(private http: HttpClient) { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  login(data: { email: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/login`, data);
  }

  register(data: { name: string; email: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    this._isLoggedIn = false;
    // Token temizleme vs işlemleri burada yapılabilir
  }
}
