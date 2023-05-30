import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { specialValidators, phonePattern, adressPattern, countryPattern } from 'src/app/validations/validations';

declare var $: any;    

@Component({
  selector: 'app-person-update-modal',
  templateUrl: './person-update-modal.component.html',
  styleUrls: ['./person-update-modal.component.css']
})
export class PersonUpdateModalComponent implements OnInit { 

  editPersonForm!: FormGroup;
  invalidForm: boolean = false;
  actualDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  actualStrDate: string = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';

  phonePattern = phonePattern;
  adressPattern = adressPattern;
  countryPattern = countryPattern;

  @Input() person!: PersonModel;
  @Output() onUpdatePerson: EventEmitter <PersonModel> = new EventEmitter ()

  constructor(private formBuilder: FormBuilder, private pd:DatePipe) 
    {}

  ngOnInit ():void {

    this.editPersonForm = this.formBuilder.group({
      id: [this.person.id],
      name: [this.person.name,[Validators.required]],
      lastName: [this.person.lastName,[Validators.required]],
      adress: [this.person.adress,[Validators.required,Validators.pattern(this.adressPattern)]],
      phone: [this.person.phone,[Validators.required, Validators.pattern(this.phonePattern)]],
      birthday: [this.pd.transform(this.person.birthday,"yyyy-MM-dd"),[specialValidators.validateDate, Validators.required]],
      country: [this.person.country,[Validators.required,Validators.pattern(this.countryPattern)]],
    })    
  }
  
  resetForm () {                                                           
    $("#person-update-modal-"+this.person.id).on('hidden.bs.modal',  () => {         
      this.editPersonForm.patchValue(this.person);
      this.editPersonForm.get('birthday')?.setValue(this.pd.transform(this.person.birthday,"yyyy-MM-dd"));
      this.hideErrorMessage();   
      })     
  }

  onSubmit ():void {
    if(this.editPersonForm.invalid) {  
      this.invalidForm=true;
    } else {      
      this.person=this.editPersonForm.value;    
      this.onUpdatePerson.emit(this.person);                
      $("#person-update-modal-"+ this.person.id).modal('hide');
    }
  }

  hideErrorMessage () {       
    this.invalidForm=false
  } 
}

// class specialValidators {
//   public static validateDate(element:FormControl) {
//     let text = element.value;
//     let invalid: boolean = false;
//     let aux:Date = new Date(text);
//     let selectedDate:Date = new Date(aux.getUTCFullYear(),aux.getUTCMonth(),aux.getUTCDate());
//     invalid = (selectedDate > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) ||
//                selectedDate < new Date("01-01-1930"));
//     return invalid ? {invalid:true}:null;
//   }
// }