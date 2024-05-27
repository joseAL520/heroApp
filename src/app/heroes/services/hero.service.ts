import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
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
 
    
    //CRUD
    
    // agregar
    addHero( hero:Hero):Observable<Hero>{
        return this.http.post<Hero>(`${this.baseUrl}/heroes/`,hero);
    }

    // actualizar el .patch solo actualiza una parte del registro
    updateHero( hero:Hero):Observable<Hero>{
        if(!hero.id) throw Error('hero id is requerid');
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero);
    }

    // Eleminiar
    deletHero( id:string):Observable<boolean>{
        return this.http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError(err => of (false)),
                map( resp => true)
            )
    }


}