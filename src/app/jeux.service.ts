import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getJeu(id: number): Observable<any> {
    const url = `http://localhost:8000/api/jeux/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map(res => res.data.item),
      tap(body => console.log(body)),
      catchError(async (error) => console.log(error))
    );
  }
}
