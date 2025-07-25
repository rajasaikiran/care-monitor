
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = '/api/login';
   private readonly tokenKey = 'authToken';
  private readonly userEmailKey = 'userEmail';

  constructor(private http: HttpClient, private cookieService: CookieService,   private router: Router) {}


public login(email: string, password: string) {
    return this.http.post<{ token: string; user: { email: string } }>(
      '/api/login',
      { email, password }
    );
  }

 protected saveSession(token: string, email: string) {
    this.cookieService.set(this.tokenKey, token);
    this.cookieService.set(this.userEmailKey, email);
  }

 public logout() {
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.userEmailKey);
    this.router.navigate(['/login']);
  }

 public isAuthenticated(): boolean {
    return this.cookieService.check(this.tokenKey);
  }

 public getUserEmail(): string {
    return this.cookieService.get(this.userEmailKey);
  }
}