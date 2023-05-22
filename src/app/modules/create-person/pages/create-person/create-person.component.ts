import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { PeopleService } from 'src/app/modules/home/services/people.service';
import { Router } from '@angular/router';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

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
  actualDate!: Date;
  actualStrDate!: string;
  faCircleCheck= faCircleCheck;
  peopleSubscription?: Subscription;

  phonePattern:string="[+]\\d{2,3}\\s\\(\\d{3}\\)\\s\\d{3}\\-\\d{4}";
  adressPattern:string="\\d*\\w+\\s\\w+(\\s\\w+)*"
  countryPattern:string="\\w+(\\s?\\w+)*"


  @Output() onAddPerson: EventEmitter <PersonModel> = new EventEmitter ()


  constructor(private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              private route: Router) 
  { 
    this.peopleSubscription = this.peopleService.onUpdatePeople().subscribe(
    value => this.people = value
    )   
  }

  ngOnInit ():void {

    if (sessionStorage.getItem('people') == null) { 
      this.peopleService.setStorage();
    } else {  
      this.people = JSON.parse(sessionStorage.getItem('people')!);
    };

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
    this.peopleService.addPerson(this.person).subscribe( {
      next: () => {
        this.people.push(this.person);
        this.peopleService.updatePeople(this.people);
        this.createPersonForm.reset();
        this.invalidForm = false;
        $('#confirmation-modal').modal('show')
        this.route.navigate(['/home'])                  
      }, error: () => {
        alert('Error: No se pudo crear la persona, por favor intente nuevamente')
      }
    })  
    }    
  }

  hideErrorMessage () {       
    this.invalidForm=false
  } 

}


class specialValidators {
  public static validateDate(element:FormControl) {
    let text = element.value;
    let invalid: boolean = false;
    let aux:Date = new Date(text);

    let selectedDate:Date = new Date(aux.getUTCFullYear(),aux.getUTCMonth(),aux.getUTCDate());
    invalid = (selectedDate > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) ||
               selectedDate < new Date("01-01-1930"));

    return invalid ? {invalid:true}:null;
  }
}
