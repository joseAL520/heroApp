import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

// rutas principales o ruta padre
const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate:[AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    // por si no se encuentra la direccion
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo:'heroes',
    pathMatch:'full' // ayuda para que no se redirecciones
  },
  {
    path:'**',
    redirectTo:'404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
