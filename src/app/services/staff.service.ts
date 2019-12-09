import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { config } from '../config';

const { host, port } = config;

@Injectable()
export class StaffService {

  _staff = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  get staff() {
    return this._staff.asObservable();
  }

  // loadAll(errorObserver: Subject<HttpErrorResponse>) {
  //   this.http.get<User[]>('http://192.168.223.30:4200/staff').subscribe(
  //     users => { this._staff.next(users); },
  //     error => { errorObserver.next(error); }
  //   );
  // }

  loadAll(errorObserver: Subject<HttpErrorResponse>) {
    this.http.get<User[]>(`http://${host}:${port}/api/user`).subscribe(
      users => { this._staff.next(users); },
      error => { errorObserver.next(error); }
    );
  }

  // getById(id: string): Observable<User> {
  //   return this.http.get<User[]>('http://192.168.223.30:4200/staff').pipe(
  //     map(users => users.find(user => user.id == id))
  //   );
  // }

  // async getById(id: string): Promise<User> {
  //   const users = await this.http.get<User[]>('http://192.168.223.30:4200/staff').toPromise();
  //   return users.find(user => user.ID == id);
  // }

  async getById(id: string): Promise<User> {
      const user = await this.http.get<User>(`http://${host}:${port}/api/user/${id}`).toPromise();
      return user;
    }

  editUser(user: User) {
    console.log(user);
    return this.http.put<User>(`http://${host}:${port}/api/user/${user.ID}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addUser(user: User) {
    return this.http.post<User>(`http://${host}:${port}/api/user`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(err => {
        console.log(err);
        return of(err);
      })
    );
  }

  deleteUser(id) {
    return this.http.delete(`http://${host}:${port}/api/user/${id}`);
  }

  getAgentsForContext(id): Observable<User[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/agents?$expand=agents`).pipe(
      map(data => data.agents.__ENTITIES)
    );
  }

}
