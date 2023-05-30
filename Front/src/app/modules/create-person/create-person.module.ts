import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CreatePersonRoutingModule } from './create-person-routing.module';
import { CreatePersonComponent } from './pages/create-person/create-person.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CreatePersonComponent
  ],
  imports: [
    CommonModule,
    CreatePersonRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [DatePipe]
})
export class CreatePersonModule { }
