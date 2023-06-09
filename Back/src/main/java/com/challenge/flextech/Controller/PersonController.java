package com.challenge.flextech.Controller;
import com.challenge.flextech.Model.Person;
import com.challenge.flextech.Service.IPersonService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    public IPersonService personService;
    
    @GetMapping ("/people")
    public List <Person> getPeople () {
        return personService.getPeople();
    }    
    
    @PostMapping ("/person")
    public Person createPerson (@RequestBody Person person) {
        personService.createPerson(person);
          return person;
    }
    
    @PostMapping ("/people")
    public List <Person> createPeople (@RequestBody List <Person> people) {
        personService.createPeople(people);
        return people;         
    }
    
    @PutMapping ("/person/{id}")
    public Person editPerson (@PathVariable Integer id, 
                              @RequestBody Person person) {
        person.setId(id);
        personService.createPerson(person); 
        
        return person;
    }
    
    @DeleteMapping ("/person/{id}")
    public void deletePerson (@PathVariable Integer id) {
        personService.deletePerson(id);
    }
      
        
}
