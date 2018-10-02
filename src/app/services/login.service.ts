import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

import { config } from '../config';

const { host, port } = config;

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) {
    this.updateSession();
  }

  _loggedIn = new BehaviorSubject<boolean>(false);
  _failed = new Subject<boolean>();
  _session = new Subject<any>();

  updateSession() {
    this.http.get(`http://${host}:${port}/session/me`, {
      withCredentials: true,
      responseType: 'text'
    }).subscribe(
      fullName => {
        this._loggedIn.next(fullName !== 'guest');
        this._session.next({ user: { fullName }});
      }
    );
  }

  get loggedIn() {
    return this._loggedIn.asObservable();
  }

  get failed() {
    return this._failed.asObservable();
  }

  get session() {
    return this._session.asObservable();
  }

  login({username, password}) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
    console.log(body);
    this.http.post(`http://${host}:${port}/login`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe(
      response => {
        this._loggedIn.next(true);
        this._failed.next(false);
        this.updateSession();
      },
      response => {
        console.log('erreur plutot :^)');
        this._failed.next(true);
      }
    );
  }

  logout() {
    this.http.post(`http://${host}:${port}/logout`, {}).subscribe(
      response => {
        this._loggedIn.next(false);
        this.updateSession();
      }
    );
  }
}
