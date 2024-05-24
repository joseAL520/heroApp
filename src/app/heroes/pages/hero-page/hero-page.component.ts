import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent  implements OnInit{

  public hero?: Hero


  constructor(
    private HeroServices: HeroService,
    private activatedRout: ActivatedRoute,
    private router: Router,
  ){}



  ngOnInit(): void {
    this.activatedRout.params
      .pipe(
        switchMap( ({id}) => this.HeroServices.getHeroBy(id)),
      ).subscribe(hero =>{
          if(!hero) return this.router.navigate(['/heroes/list'])
            console.log(hero)
        this.hero = hero;
        return;
      })
  }

 


}
