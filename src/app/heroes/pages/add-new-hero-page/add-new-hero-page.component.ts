import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroService } from '../../services/hero.service';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';

import { filter, switchMap } from 'rxjs';

import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styles: ``
})
export class AddNewHeroPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable:true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:   new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  constructor(  
    private heroService: HeroService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}
  
  
  ngOnInit(): void {
    
    if(!this.router.url.includes('edit')) return;

    this.activateRouter.params
      .pipe(
        switchMap( ({ id }) =>  this.heroService.getHeroBy(id)),

      ).subscribe(hero => {
          if( !hero) return this.router.navigateByUrl('/')
        
          this.heroForm.reset( hero );
          return;
      });

  }



  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero
  }

  onSubmit():void{

    if( this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          //TODO: mostrar snackbaar
          this.showSnabar(`${hero.superhero} Updated`);
        })

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        //TODO: mostrar snackbaar Y navegar a/hero/edit/hero:id
        this.router.navigate(['/heroes/edit',hero.id]);
        this.showSnabar(`${hero.superhero} Created`);

      })

  }

  onDeleteHero(){
    if(!this.currentHero.id)throw Error('HERO ID IS REQUERID');

    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.heroForm.value
    });


      // forma 1
    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;

    //   // eliminar
    //   this.heroService.deletHero(this.currentHero.id)
    //       .subscribe(wasDeleted => {
    //           if(wasDeleted) this.router.navigate(['/heroes'])
    //       });
      
    // });


    // forma 2 obtimizado

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result === true ),
      switchMap( () =>  this.heroService.deletHero(this.currentHero.id)),
      filter( (wasDelet: boolean) => wasDelet )
    )
    .subscribe( () => {
      this.router.navigate(['/heroes/list'])
    });



  }


  showSnabar(messange:string): void{
    this.snackbar.open(messange,'done',{
      duration: 2500,
    })
  }

}
