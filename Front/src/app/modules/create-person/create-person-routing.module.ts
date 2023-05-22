import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonComponent } from './pages/create-person/create-person.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePersonRoutingModule { }
