import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { faEdit, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  people!: PersonModel[];
  faEdit = faEdit;
  faX = faX;
  faSpinner = faSpinner;
  peopleSubscription?: Subscription;

  constructor ( private peopleService : PeopleService) {  
    this.peopleSubscription = this.peopleService.onUpdatePeople().subscribe(
      value => this.people = value    
    )
  }

  ngOnInit(): void { 

    if (sessionStorage.getItem('people') == null) { 
        this.peopleService.setStorage();
    } else {  
      this.people = JSON.parse(sessionStorage.getItem('people')!);
    }
  }

  deletePerson (id:number): void {
    this.peopleService.deletePerson(id).subscribe( {
      next: () => {   
        const modifiedPeople = this.people.filter(person => person.id !== id)
        this.peopleService.updatePeople(modifiedPeople)
      },      
      error: () => {
        alert('Error: No se pudo eliminar el registro, por favor intente nuevamente')
      }
      
    })
  }

  updatePerson (person:any): void {
    this.peopleService.updatePerson(person).subscribe( {
      next: () => {
      const modifiedPerson: any = this.people.find(person => person.id == person.id);
      this.people[this.people.indexOf(modifiedPerson)]=person;
      this.peopleService.updatePeople(this.people); 
      },      
      error: () => {
        alert('Error: No se pudo modificar el registro, por favor intente nuevamente')
      }
    })
  }
}
