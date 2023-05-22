import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'add-person',
    loadChildren: () =>
      import('./modules/create-person/create-person.module').then((m) => m.CreatePersonModule)
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./modules/statistics/statistics.module').then((m) => m.StatisticsModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },  
  {
    path:'**', 
    redirectTo: '/home', 
    pathMatch: 'full'
  }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
