import { Component, ViewChild, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { faEdit, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { Subscription } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  people!: PersonModel[];
  faEdit = faEdit;
  faX = faX;
  faSpinner = faSpinner;
  peopleSubscription?: Subscription;
  displayedColumns: string[] = [ 'id', 'name', 'lastName', 'birthday', 'phone', 'adress', 'country', 'delete', 'update'];
  dataSource!: MatTableDataSource<PersonModel>;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor ( private peopleService : PeopleService) {  
    this.peopleSubscription = this.peopleService.onUpdatePeople().subscribe(
      value => {        
        this.people = value
        this.dataSource = new MatTableDataSource(this.people);
        this.setPaginatorAndSort();  
        this.isLoading=false;       
      }        
    )    
  }

  ngOnInit(): void { 

    sessionStorage.getItem('people')
    ? this.getStorage()
    : this.peopleService.setStorage()
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStorage = async() => {
    this.people = await JSON.parse(sessionStorage.getItem('people')!);
    this.dataSource = new MatTableDataSource(JSON.parse(sessionStorage.getItem('people')!));
    this.setPaginatorAndSort();
    this.isLoading=false;   
  }

  setPaginatorAndSort () {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePerson (id:number): void {
    this.peopleService.deletePerson(id).subscribe( {
      next: () => {   
        const modifiedPeople = this.people.filter(person => person.id !== id);
        this.peopleService.updatePeople(modifiedPeople);
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
