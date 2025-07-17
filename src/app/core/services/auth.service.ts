import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  private apiUrl = 'https://localhost:7033/api/auth';

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: { email: string; password: string }): Observable<{ token: string, message: string }> {
    return this.http.post<{ token: string, message: string }>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }
}
