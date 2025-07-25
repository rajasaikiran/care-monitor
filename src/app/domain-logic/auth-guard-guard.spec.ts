import { TestBed } from '@angular/core/testing';
 import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authGuard } from './auth-guard-guard';

describe('authGuard', () => {
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['check']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CookieService, useValue: cookieSpy },
        { provide: Router, useValue: routeSpy }
      ]
    });

    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should return true if token cookie exists', () => {
    cookieServiceSpy.check.and.returnValue(true);
    const result = authGuard(dummyRoute, dummyState);
    expect(result).toBeTrue();
  });

  it('should navigate to /login and return false if token cookie does not exist', () => {
    cookieServiceSpy.check.and.returnValue(false);
    const result = authGuard(dummyRoute, dummyState);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });
});
