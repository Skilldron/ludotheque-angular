import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {User} from "../_models/user";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<UserInfo> {
    return this.http.get<any>(environment.apiUrl + '/auth/user-profile', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  //updateUser(user: User): Observable<User> {
  //  const url = `${environment.apiUrl}/depenses/${user.id}`;
  //  return this.http.put<any>(url, user, this.httpOptions)
  //    .pipe(
  //      map(res => res.data.item),
  //      catchError(err => {
  //        console.log('Erreur http : ', err);
  //        return of(undefined);
  //      })
  //    );
  //}

}
