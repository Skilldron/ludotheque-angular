import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map, tap} from 'rxjs/operators';
import {UserInfo} from './app/_models/user-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<UserInfo> {
    const url = environment.apiUrl + `/user/${id}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(rep => rep.data.item)
      );
  }
}
