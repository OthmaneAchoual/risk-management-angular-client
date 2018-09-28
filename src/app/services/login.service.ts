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
    // this.http.get<any>(`http://${host}:${port}/session`, {
    //   withCredentials: true
    // }).subscribe(
    //   session => {
    //     const guest = session.user.fullName === 'default guest';
    //     this._loggedIn.next(!guest);
    this._session.next({ user: { fullName: 'John Doe' } });
    //   }
    // );
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

  login(credentials) {
    this._loggedIn.next(true);
    this._failed.next(false);
    this.updateSession();
    // this.http.post(`http://${host}:${port}/login`, credentials).subscribe(
    //   response => {
    //     this._loggedIn.next(true);
    //     this._failed.next(false);
    //     this.updateSession();
    //   },
    //   response => {
    //     console.log('erreur plutot :^)');
    //     this._failed.next(true);
    //   }
    // );
  }

  logout() {

    this._loggedIn.next(false);
    this.updateSession();
    // this.http.post(`http://${host}:${port}/logout`, {}).subscribe(
    //   response => {
    //     this._loggedIn.next(false);
    //     this.updateSession();
    //   }
    // );
  }
}
