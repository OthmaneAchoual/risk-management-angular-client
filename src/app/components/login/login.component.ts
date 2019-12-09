import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'username': new FormControl('', [
      Validators.required
    ]),
    'password': new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService
  ) { }

  loggedIn: Observable<boolean>;
  failedLogin: Observable<boolean>;

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;
    this.failedLogin = this.loginService.failed;

    this.failedLogin.subscribe(console.log);

    this.loggedIn.subscribe(
      loggedIn => loggedIn && this.dialogRef.close(null)
    );
  }

  login() {
    this.loginService.login(this.loginForm.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
