import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PersonModel } from 'src/app/core/models/Person.interface';

declare var $: any;    

@Component({
  selector: 'app-person-update-modal',
  templateUrl: './person-update-modal.component.html',
  styleUrls: ['./person-update-modal.component.css']
})
export class PersonUpdateModalComponent implements OnInit { 

  editPersonForm!: FormGroup;
  invalidForm: boolean = false;
  actualDate!: Date;
  actualStrDate!: string;

  phonePattern:string="[+]\\d{2,3}\\s\\(\\d{3}\\)\\s\\d{3}\\-\\d{4}";
  adressPattern:string="\\d*\\w+\\s\\w+(\\s\\w+)*"
  countryPattern:string="\\w+(\\s?\\w+)*"

  @Input() person!: PersonModel;  

  @Output() onUpdatePerson: EventEmitter <PersonModel> = new EventEmitter ()

  constructor(private formBuilder: FormBuilder, private pd:DatePipe) 
    {}

  ngOnInit ():void {
    
    this.actualDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.actualStrDate = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';

    this.editPersonForm = this.formBuilder.group({
      id: [this.person.id],
      name: [this.person.name,[Validators.required]],
      lastName: [this.person.lastName,[Validators.required]],
      adress: [this.person.adress,[Validators.required,Validators.pattern(this.adressPattern)]],
      phone: [this.person.phone,[Validators.required, Validators.pattern(this.phonePattern)]],
      birthday: [this.pd.transform(this.person.birthday,"yyyy-MM-dd"),[specialValidators.validateDate, Validators.required]],
      country: [this.person.country,[Validators.required]],
    })    
  }
  
  resetForm () {                                                           
    $("#person-update-modal-"+this.person.id).on('hidden.bs.modal',  () => {         
          
      this.editPersonForm.patchValue(this.person);
      this.editPersonForm.get('birthday')?.setValue(this.pd.transform(this.person.birthday,"yyyy-MM-dd"));
      this.hideErrorMessage(); 
      console.log(this.invalidForm)        
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