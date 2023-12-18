import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Picture } from 'src/models/picture';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  picture: Picture[] = [];

  constructor(private http: HttpClient) {}

  getPicture() {
    return this.http.get(`${environment.api}pictures`, {
      responseType: 'blob',
    });
  }

  getPictureById(id: number) {
    // console.log("hfhgf", id)
    return this.http.get(`${environment.api}pictures/${id}`, {
      responseType: 'blob',
    });
  }
  

  postPicture(formData: FormData) {
    return this.http.post(`${environment.api}pictures`, formData);
  }

  deletePicture(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`${environment.api}pictures/${id}`, {
      headers: headers,
    });
  }
}
