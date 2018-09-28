import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Equipment } from '../models/equipment';

import { config } from '../config';
import { map } from 'rxjs/operators';

const { host, port } = config;

@Injectable()
export class EquipmentService {

  private _equipment = new BehaviorSubject<Equipment[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get equipment() {
    return this._equipment.asObservable();
  }

  getEquipment(id) {
    return this.http.get<Equipment>(`http://${host}:${port}/api/equipment/${id}`);
  }

  loadAll() {
    this.http.get<Equipment[]>(`http://${host}:${port}/api/equipment`).subscribe(
      equipment => this._equipment.next(equipment)
    );
  }

  addEquipment(equipment) {
    return this.http.post<Equipment>(`http://${host}:${port}/api/equipment`, equipment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateEquipment(equipment) {
    return this.http.put<Equipment>(`http://${host}:${port}/api/equipment/${equipment.ID}`, equipment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteEquipment(id) {
    return this.http.delete(`http://${host}:${port}/api/equipment/${id}`);
  }

  upload(input) {
    return this.http.post(`http://${host}:${port}/api/image`, input, {
      responseType: 'text'
    });
  }

  downloadImage(id) {
    return this.http.get(`http://${host}:${port}/api/downloadimage/${id}`, {
      responseType: 'blob'
    });
  }

  getEquipmentsForContext(id): Observable<Equipment[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/equipments?$expand=equipments`).pipe(
      map(data => data.equipments.__ENTITIES)
    );
  }

}
