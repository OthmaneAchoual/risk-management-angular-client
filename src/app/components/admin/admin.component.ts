import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginService } from '../../services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  title = 'app';
  loggedIn: Observable<boolean>;
  sessionInfo: Observable<any>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.loggedIn = this.loginService.loggedIn;
    this.sessionInfo = this.loginService.session;
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

  login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

  logout() {
    this.loginService.logout();
  }
}
