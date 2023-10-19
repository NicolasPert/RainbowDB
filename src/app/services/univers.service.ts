import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Univer } from 'src/models/univer';

@Injectable({
  providedIn: 'root',
})
export class UniversService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getUnivers(): Observable<Univer[]> {
    return this.http.get<Univer[]>('http://localhost:3000/api/univers');
  }
}
