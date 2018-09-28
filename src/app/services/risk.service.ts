import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Risk } from '../models/risk';
import { config } from '../config';

const { host, port } = config;


@Injectable()
export class RiskService {

  constructor(
    private http: HttpClient
  ) { }

  _risks = new BehaviorSubject<Risk[]>([]);

  get risks() {
    return this._risks.asObservable();
  }

  getById(id) {
    return this.http.get<Risk>(`http://${host}:${port}/api/risk/${id}`);
  }

  loadAll() {
    this.http.get<Risk[]>(`http://${host}:${port}/api/risk`).subscribe(
      risks => this._risks.next(risks)
    );
  }

  async addRisk(risk: Risk) {
    const response = await this.http.post<Risk>(`http://${host}:${port}/api/risk`, risk, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).toPromise();
    return response;
  }

  deleteRisk(id) {
    return this.http.delete(`http://${host}:${port}/api/risk/${id}`);
  }

  updateRisk(risk: Risk) {
    return this.http.put<Risk>(`http://${host}:${port}/api/risk/${risk.ID}`, risk, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  getRisksForContext(id): Observable<Risk[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/risks?$expand=risks`).pipe(
      map(data => data.risks.__ENTITIES)
    );
  }

}
