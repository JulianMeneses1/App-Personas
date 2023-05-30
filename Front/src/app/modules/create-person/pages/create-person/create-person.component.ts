import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { PeopleService } from 'src/app/modules/home/services/people.service';
import { Router } from '@angular/router';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { specialValidators, phonePattern, adressPattern, countryPattern } from 'src/app/validations/validations';

declare var $: any;    

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  createPersonForm!: FormGroup;
  invalidForm: boolean = false;
  person!: PersonModel;
  people!: PersonModel[];
  actualDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  actualStrDate: string = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';
  faCircleCheck= faCircleCheck;
  peopleSubscription?: Subscription;

  phonePattern = phonePattern;
  adressPattern = adressPattern;
  countryPattern = countryPattern;

  @Output() onAddPerson: EventEmitter <PersonModel> = new EventEmitter ();

  constructor(private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              private route: Router,
              private pd:DatePipe) 
  { 
    this.peopleSubscription = this.peopleService.onUpdatePeople().subscribe(
    value => this.people = value
    )   
  }

  ngOnInit ():void {

    sessionStorage.getItem('people')
    ? this.people = JSON.parse(sessionStorage.getItem('people')!)
    : this.peopleService.setStorage()

    this.createPersonForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern(this.phonePattern)]],
      adress: ['',[Validators.required, Validators.pattern(this.adressPattern)]],
      birthday: ['',[specialValidators.validateDate, Validators.required]],
      country: ['',[Validators.required, Validators.pattern(this.countryPattern)]]
    })
  }
  
  resetForm () {        
      this.createPersonForm.reset();
      this.invalidForm = false  
  } 

  onSubmit ():void {
    if(this.createPersonForm.invalid) {    
      this.invalidForm=true;
    } else {   
      this.person = this.createPersonForm.value;     
      this.peopleService.addPerson(this.person).subscribe( 
        {
          next: (person) => {
            this.people.push(person);        
            this.peopleService.updatePeople(this.people);
            this.createPersonForm.reset();
            this.invalidForm = false;
            $('#confirmation-modal').modal('show')
            this.route.navigate(['/home'])                  
          }, error: () => {
            alert('Error: No se pudo crear la persona, por favor intente nuevamente')
          }
        }
      )  
    }    
  }

  hideErrorMessage () {       
    this.invalidForm=false
  }  
}
