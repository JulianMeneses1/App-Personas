import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/core/models/Person.interface';
import { PeopleService } from 'src/app/modules/home/services/people.service';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  people!: PersonModel[];
  peopleSubscription?: Subscription;

  constructor ( private peopleService: PeopleService) {
    this.peopleSubscription = this.peopleService.onUpdatePeople().subscribe(
      value => this.people = value    
    )   
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('people') == null) { 
      this.peopleService.setStorage();
      this.generateChar(this.countPeopleByCountries(this.people));
    } else {  
      this.people = JSON.parse(sessionStorage.getItem('people')!);
      this.generateChar(this.countPeopleByCountries(this.people));
    }    
  }     

  generateChar (peopleByCountry: any[]) { 
    
    this.countPeopleByCountries(this.people);
    Chart.register(...registerables);
    new Chart('peopleByCountries', {
      type: 'bar',
      data: {
        labels: peopleByCountry.map(item=>item.country),
        datasets: [{
          label: 'Número de personas',
          data: peopleByCountry.map(item => item.totalQuantity),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }     

  countPeopleByCountries(people:any[]):any[] { 

    const peopleByCountry: any = {};  

    for (const person of people) {
      const country = person.country;  

      if (peopleByCountry[country]) {
        peopleByCountry[country] += 1;
      } else {
        peopleByCountry[country] = 1;
      }
    } 
    const result = Object.keys(peopleByCountry).map(country => {
      return { country, totalQuantity: peopleByCountry[country] };
    });
    return result;    
  }  
}
