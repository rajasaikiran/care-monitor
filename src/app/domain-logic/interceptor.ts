// src/app/interceptors/mock-api.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockApiInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (req.url.endsWith('/api/login') && req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'careMonitor@example.com' && password === 'careMonitor') {
      return of(new HttpResponse({
        status: 200,
        body: {
          token: 'mocked-jwt-token',
          user: { email }
        }
      })).pipe(delay(500));
    } else {
      return throwError(() => new Error('Invalid email or password'));
    }
  }

  if (req.url.endsWith('/api/items') && req.method === 'GET') {
    const items = [
      { id: 1, name: 'Item One', description: 'Description of item one' },
      { id: 2, name: 'Item Two', description: 'Description of item two' },
      { id: 3, name: 'Item Three', description: 'Description of item three' },
    ];
    return of(new HttpResponse({ status: 200, body: items })).pipe(delay(500));
  }

  return next(req);
};
