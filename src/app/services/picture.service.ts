import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/models/picture';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  picture: Picture[] = [];

  constructor(private http: HttpClient) {}

  getPicture() {
    return this.http.get('http://localhost:3000/api/pictures', {
      responseType: 'blob',
    });
  }

  getPictureById(id: number) {
    // console.log("hfhgf", id)
    return this.http.get(`http://localhost:3000/api/pictures/${id}`, {
      responseType: 'blob',
    });
  }
  

  postPicture(formData: FormData) {
    return this.http.post('http://localhost:3000/api/pictures', formData);
  }

  deletePicture(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/api/pictures/${id}`, {
      headers: headers,
    });
  }
}
