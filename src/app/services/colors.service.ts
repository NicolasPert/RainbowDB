import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from 'src/models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${environment.api}colors`);
  }

  updateColors(colorId: number, color: Color): Observable<Color> {
    const headers = this.setHeaders();
    return this.http.patch<Color>(
      `${environment.api}characters/${colorId}`,
      color,
      { headers }
    );
  }
}
