import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMovies } from 'src/models/createMovies';
import { Movie } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  

  createMovies(movies: CreateMovies): Observable<Movie> {
    const headers = this.setHeaders();
    return this.http.post<Movie>(`http://localhost:3000/api/movies`, movies, {
      headers,
    });
  }

  getMovie(): Observable<Movie> {
    return this.http.get<Movie>('http://localhost:3000/api/movies');
  }

  getMovieIdByName(movieName: string): Observable<number> {
    return this.http.get<number>(
      `http://localhost:3000/api/movies/id?name=${movieName}`
    );
  }
}
