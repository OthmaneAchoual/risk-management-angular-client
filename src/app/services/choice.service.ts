import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Choice } from '../models/choice';
import { map } from 'rxjs/operators';

import { config } from '../config';

const { host, port } = config;

@Injectable()
export class ChoiceService {

  _choices = new BehaviorSubject<Choice[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  loadAll() {
    this.http.get<Choice[]>(`http://${host}:${port}/api/choice`).subscribe(
      choices => this._choices.next(choices)
    );
  }

  get choices() {
    return this._choices.asObservable();
  }

  getChoice(id: string) {
    return this.http.get<Choice>(`http://${host}:${port}/api/choice/${id}`);
  }

  deleteChoice(id: string) {
    return this.http.delete(`http://${host}:${port}/api/choice/${id}`);
  }

  addChoice(choice: Choice) {
    return this.http.post<Choice>(`http://${host}:${port}/api/choice`, choice, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateChoice(choice: Choice) {
    return this.http.put<Choice>(`http://${host}:${port}/api/choice/${choice.ID}`, choice, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getChoicesForContext(id): Observable<Choice[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/types?$expand=types`).pipe(
      map(data => data.types.__ENTITIES)
    );
  }

}
