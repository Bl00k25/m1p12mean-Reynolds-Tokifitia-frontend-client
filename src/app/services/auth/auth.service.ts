import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BASE_URL+'/api/clients';
  constructor(private http: HttpClient) { }

  SetClientToken(token: string) {
    sessionStorage.setItem('clientID', token);
  }

  GetClientToken() {
    return sessionStorage.getItem('clientID');
  }
  
  SignClientIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  SignClientUp(information: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, information);
  }
}
