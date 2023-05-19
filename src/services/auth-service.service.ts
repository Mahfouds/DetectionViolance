import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { UserInfoDTO } from 'src/models/UserInfoDTO';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  setId(id: string) { localStorage.setItem("id", id); }
  getId() {
    const str = localStorage.getItem("id");
    let id_user! : number ;
    if( str != null && str != undefined)
      id_user = parseInt(str);
    return  id_user;
  }

  setToken(token: string) { localStorage.setItem("token", token); }
  getToken() { return localStorage.getItem("token"); }

  setIsLoggedIn(isLoggedIn: string) { localStorage.setItem("isLoggedIn", isLoggedIn); };
  getIsLoggedIn() { return localStorage.getItem("isLoggedIn"); }

  authenticateUser(user: User) {
    return this.http.post<any>('http://localhost:8080/api/auth/authenticate', user);
  }

  singOut() {
    const token = this.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    return this.http.get<any>('http://localhost:8080/api/auth/logout', httpOptions).subscribe({
      next: (res) => {

      }, error: (err) => {
        if (err instanceof HttpErrorResponse) {
          const code = err.status;
          if (code === 200) {
            localStorage.clear();
            this.router.navigate([""]);
          }
        }
      }
    });
  }
  register(user: User) {
    return this.http.post('http://localhost:8080/api/auth/register', user);
  }
  getUserInfos():Observable<UserInfoDTO>{
    const token = this.getToken();
    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + token
      }
    };
    return this.http.get<UserInfoDTO>("http://localhost:8080/Chat/getUserInfos/"+this.getId(),httpOptions);
  }

}
