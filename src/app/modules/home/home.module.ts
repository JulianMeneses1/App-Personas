import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonDeleteModalComponent } from './components/person-delete-modal/person-delete-modal.component';
import { PersonUpdateModalComponent } from './components/person-update-modal/person-update-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'



@NgModule({
  declarations: [
    HomeComponent,
    PersonDeleteModalComponent,
    PersonUpdateModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [DatePipe]
})
export class HomeModule { }
