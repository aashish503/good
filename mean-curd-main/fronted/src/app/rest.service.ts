import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:4000/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) {}
  getAllPosts(): Observable<any> {
    return this.http.get(endpoint);
  }

}
