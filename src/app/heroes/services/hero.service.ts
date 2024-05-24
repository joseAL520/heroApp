import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';


@Injectable({providedIn: 'root'})

export class HeroService {

    private baseUrl: string = enviroments.baseUrl
    constructor(
        private http: HttpClient
    ) { }

    /// listado de heroes
    getHero(): Observable <Hero[]>{
        return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
    }

    // buscar heroe por id
    getHeroBy(id:string):Observable<Hero | undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                // of crea un observabol
                catchError(error => of(undefined))
            )
    }

    //auoCompletar para buscador
    getSuggestions(query:string):Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);

    }
    
}