import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonModel } from 'src/app/core/models/Person.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private subjectUpdatePeople = new Subject<PersonModel[]>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  private url:string = environment.url

  public onUpdatePeople():Observable<PersonModel[]>{
    return this.subjectUpdatePeople.asObservable();
  }

  public updatePeople(people:PersonModel[]):void {    
    this.subjectUpdatePeople.next(people); 
    sessionStorage.setItem('people',JSON.stringify(people));  
  }

  public setStorage():void {
    this.getPeople().subscribe(data => {
      sessionStorage.setItem('people',JSON.stringify(data));      
      this.subjectUpdatePeople.next(data);
    })      
  }

  public getPeople ():Observable <PersonModel[]> {    
    return this.httpClient.get<PersonModel[]>(this.url+'people');
  }

  public addPerson (person: PersonModel):Observable <PersonModel> {
    return this.httpClient.post<PersonModel>(this.url+'person',person,this.httpOptions);
  }

  public updatePerson (person: PersonModel): Observable <PersonModel> {
    return this.httpClient.put<PersonModel>(this.url+'person/'+person.id,person,this.httpOptions);
  }

  public  deletePerson (id: number) :Observable <PersonModel> {
    return this.httpClient.delete<PersonModel>(this.url+'person/'+id);
  }
}
