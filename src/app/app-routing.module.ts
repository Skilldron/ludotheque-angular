import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {ListeJeuxComponent} from './liste-jeux/liste-jeux.component';
import {DetailJeuComponent} from './detail-jeu/detail-jeu.component';
import {RegisterComponent} from './register/register.component';
import {AjoutjeuComponent} from './ajoutjeu/ajoutjeu.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'liste-jeux', component: ListeJeuxComponent },
  {path: 'profile', component: ProfileComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'liste-jeux/:id', component: DetailJeuComponent},
  {path: 'ajoutjeu', component: AjoutjeuComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
