import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCharacter } from 'src/models/createCharacter';
import { Character } from 'src/models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('http://localhost:3000/api/characters');
  }

  createCharacter(character: CreateCharacter): Observable<Character> {
    const headers = this.setHeaders();
    return this.http.post<Character>(
      `http://localhost:3000/api/characters`,
      character,
      { headers }
    );
  }

  getCharacterById(characterId: number): Observable<Character> {
    const headers = this.setHeaders();
    return this.http.get<Character>(
      `http://localhost:3000/api/characters/${characterId}`,
      { headers}
    );
  }

  updateCharacter(
    characterID: number,
    character: CreateCharacter
  ): Observable<CreateCharacter> {
    const headers = this.setHeaders();
    return this.http.patch<CreateCharacter>(
      `http://localhost:3000/api/characters/${characterID}`,
      character,
      {
        headers,
      }
    );
  }

  deleteCharacter(character: Character): Observable<Character> {
    // recup le token dans le sessionstorage
    const headers = this.setHeaders();
    return this.http.delete<Character>(
      `http://localhost:3000/api/characters/${character.id}`,
      { headers }
    );
  }
}
