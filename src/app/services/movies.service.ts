import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getMovie(): Observable<Movie> {
    return this.http.get<Movie>('http://localhost:3000/api/movies');
  }

  getMovieById(movieId: number): Observable<Movie> {
    // const headers = this.setHeaders();
    return this.http.get<Movie>(
      `http://localhost:3000/api/character/${movieId}`
    );
  }
}
