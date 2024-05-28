
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})


export class AuthService {

    private  baseUrl = enviroments.baseUrl
    private user?: User;

    constructor(  private http: HttpClient ) { }
    

    get currensUser(): User | undefined{
        // if(!this.user) return undefined;
        // // esto hace un diiv clone un clon de angular de este valor
        // return structuredClone (this.user);
        if ( !this.user ) return undefined;
        return structuredClone( this.user );
    }


    // login temporal
    login( email: string, password: string ):Observable<User> {
        // http.post('login',{ email, password });
        return this.http.get<User>(`${ this.baseUrl }/users`)
          .pipe(
            tap( user => this.user = user ),
            tap( user => localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k' )),
          );
      }


    logout(){
        this.user = undefined;
        localStorage.clear();
    }

}