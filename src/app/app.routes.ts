import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { authGuard } from './domain-logic/auth-guard-guard';

 
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  
  {
    path: 'list',
    loadComponent: () => import('./list/list').then(m => m.List),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];