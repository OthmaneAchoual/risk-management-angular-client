import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WorkContext } from '../models/work-context';
import { config } from '../config';

const { host, port } = config;

@Injectable()
export class WorkContextService {

  _workContexts = new BehaviorSubject<WorkContext[]>([]);
  _lastContext = new Subject<WorkContext>();

  constructor(private http: HttpClient) { }

  get contexts(): Observable<WorkContext[]> {
    return this._workContexts.asObservable();
  }

  get lastContext() {
    return this._lastContext.asObservable();
  }

  addWorkContext(context) {
    return this.http.post<WorkContext>(`http://${host}:${port}/api/workcontext`, context, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateWorkContext(context) {
    return this.http.put<WorkContext>(`http://${host}:${port}/api/workcontext/${context.ID}`, context, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  filter(val: string): Observable<WorkContext[]> {
    return this.http.get<WorkContext[]>(`http://${host}:${port}/api/workcontext`).pipe(
      map(contexts => contexts.filter(ctx => ctx.name.toLowerCase().indexOf(val.toLowerCase()) === 0))
    );
  }

  getContext(id) {
    return this.http.get<WorkContext>(`http://${host}:${port}/api/workcontext/${id}`).pipe(
      tap(workcontext => this._lastContext.next(workcontext))
    );
  }

  getContextsForContext(id): Observable<WorkContext[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/contexts?$expand=contexts`).pipe(
      map(data => data.contexts.__ENTITIES)
    );
  }

  deleteContext(id) {
    return this.http.delete(`http://${host}:${port}/api/workcontext/${id}`).pipe(
      tap(res => this._lastContext.next(null))
    );
  }

  loadAll() {
    this.http.get<WorkContext[]>(`http://${host}:${port}/api/workcontext`).subscribe(
      ctxs => this._workContexts.next(ctxs)
    );
  }
}
