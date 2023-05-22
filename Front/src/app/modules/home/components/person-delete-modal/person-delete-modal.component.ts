import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PersonModel } from 'src/app/core/models/Person.interface';

@Component({
  selector: 'app-person-delete-modal',
  templateUrl: './person-delete-modal.component.html',
  styleUrls: ['./person-delete-modal.component.css']
})
export class PersonDeleteModalComponent {

  @Input() person!: PersonModel; 
  @Output() onDeletePerson: EventEmitter <number> = new EventEmitter ();

  deletePerson () {   
    this.onDeletePerson.emit(this.person.id)    
  }
}
