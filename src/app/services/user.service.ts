import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { LoginUser } from '../../models/loginUser';
import { ReponseConnexion } from '../../models/responseConnexion';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  inscriptionUtilisateur(data: User): Observable<User> {
    return this.http.post<User>(
      `${this.baseApiUrl}/auth/register`,
      data
    );
  }

  connexionUtilisateur(data: LoginUser): Observable<ReponseConnexion> {
    return this.http.post<ReponseConnexion>(
      `${this.baseApiUrl}/auth/login`,
      data
    );
  }

  getProfilUtilisateur(): Observable<User> {
    const headers = this.setHeaders();
    return this.http
      .get<User>(`${this.baseApiUrl}/utilisateurs`, { headers })
      .pipe(
        tap((utilisateur: User) => {
          sessionStorage.setItem(
            'profilUtilisateur',
            utilisateur.admin.toString()
          );
        })
      );
  }

}
