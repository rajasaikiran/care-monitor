import { Component, inject } from '@angular/core';
import { AuthService } from '../domain-logic/auth';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [  MatButtonModule,
    RouterModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  authService = inject(AuthService);
  
  userEmail = this.authService.getUserEmail();
  logout() {
    this.authService.logout();
  }
}
