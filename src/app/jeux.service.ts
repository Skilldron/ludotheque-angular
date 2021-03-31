import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
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

  getJeux(sort?: number): Observable<any> {
    let params = '';
    if (!!sort && sort === 1) {
      params = '?sort=nom&ordre=asc';
    }
    if(!!sort && sort === -1){
      params = '?sort=note&ordre=desc';
    }
    const url = `http://localhost:8000/api/jeux${params}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getAge(age?: string ): Observable<any> {
    let params = '';
    if (!!age) {
      params = `?age=${age}`;
    }
    const url = `http://localhost:8000/api/jeux${params}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
}

