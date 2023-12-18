import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateMovies } from 'src/models/createMovies';
import { Movie } from 'src/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = `${environment.api}movies`;

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
    return this.http.post<Movie>(`${environment.api}movies`, movies, {
      headers,
    });
  }

  updateMovies(movieId: number, movies: CreateMovies): Observable<Movie> {
    const headers = this.setHeaders();
    return this.http.patch<Movie>(
      `${environment.api}characters/${movieId}`,
      movies,
      { headers }
    );
  }

  getMovie(): Observable<Movie> {
    return this.http.get<Movie>(`${environment.api}movies`);
  }

  getMovieIdByName(movieName: string): Observable<number> {
    return this.http.get<number>(
      `${environment.api}movies/id?name=${movieName}`
    );
  }

  deleteMovie(movieId: string): Observable<Movie> {
    // recup le token dans le sessionstorage
    const headers = this.setHeaders();
    return this.http.delete<Movie>(`${environment.api}movies/${movieId}`, {
      headers,
    });
  }
}
