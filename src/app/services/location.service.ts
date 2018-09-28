import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Location } from '../models/location';

import { config } from '../config';
import { map } from 'rxjs/operators';

const { host, port } = config;

@Injectable()
export class LocationService {

  _locations = new BehaviorSubject<Location[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get locations() {
    return this._locations.asObservable();
  }

  loadAll() {
    this.http.get<Location[]>(`http://${host}:${port}/api/location`).subscribe(
      locs => this._locations.next(locs)
    );
  }

  getLocation(id) {
    return this.http.get<Location>(`http://${host}:${port}/api/location/${id}`);
  }

  addLocation(location: Location) {
    return this.http.post<Location>(`http://${host}:${port}/api/location`, location, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editLocation(location) {
    return this.http.put(`http://${host}:${port}/api/location/${location.ID}`, location, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteLocation(id: string) {
    return this.http.delete(`http://${host}:${port}/api/location/${id}`);
  }

  getLocationsForContext(id): Observable<Location[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/locations?$expand=locations`).pipe(
      map(data => data.locations.__ENTITIES)
    );
  }
}
