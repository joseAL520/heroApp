import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';


@Injectable({providedIn: 'root'})

export class HeroService {

    private baseUrl: string = enviroments.baseUrl
    constructor(
        private http: HttpClient
    ) { }

    getHero(): Observable <Hero[]>{
        return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
    }
    
}