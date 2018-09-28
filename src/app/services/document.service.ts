import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Document } from '../models/document';
import { map } from 'rxjs/operators';


import { config } from '../config';

const { host, port } = config;

@Injectable()
export class DocumentService {

  _documents = new BehaviorSubject<Document[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get documents() {
    return this._documents.asObservable();
  }

  loadAll() {
    this.http.get<Document[]>(`http://${host}:${port}/api/document`).subscribe(
      docs => this._documents.next(docs)
    );
  }

  addDocument(document): Observable<Document> {
    return this.http.post<Document>(`http://${host}:${port}/api/document`, document, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  editDocument(document) {
    return this.http.put(`http://${host}:${port}/api/document/${document.ID}`, document, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteDocument(id) {
    return this.http.delete(`http://${host}:${port}/api/document/${id}`);
  }

  getDocumentsForContext(id): Observable<Document[]> {
    return this.http.get<any>(`http://${host}:${port}/rest/Work_context(${id})/documents?$expand=documents`).pipe(
      map(data => data.documents.__ENTITIES)
    );
  }

  uploadDocument(formData) {
    return this.http.post(`http://${host}:${port}/api/document/upload`, formData, {
      responseType: 'text'
    });
  }

  downloadDocument(id) {
    return this.http.get(`http://${host}:${port}/api/document/${id}/download`, {
      responseType: 'blob'
    });
  }

}
