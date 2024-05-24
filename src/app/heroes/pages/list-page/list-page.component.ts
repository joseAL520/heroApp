import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{


  public heroes: Hero[] = [];

  constructor(
    private heroServices: HeroService
  ){}


  ngOnInit(): void {
    this.heroServices.getHero().subscribe(hero => this.heroes= hero);
  }




}
