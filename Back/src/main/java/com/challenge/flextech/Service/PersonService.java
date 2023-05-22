
package com.challenge.flextech.Service;

import com.challenge.flextech.Model.Person;
import com.challenge.flextech.Repository.PersonRepository;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService implements IPersonService{
    
    @Autowired
    public PersonRepository personRepository;

    @Override
    public List<Person> getPeople() {
        return personRepository.findAll();
    }

//    @Override
//    public Person getPerson(Integer id) {
//        return personRepository.findById(id).orElse(null);
//    }
//
//    @Override
//    public Person getPersonByName(String name) {
//        return personRepository.findByName(name);
//    }

    @Override
    public void editPerson(Person person, String name, String lastName, Date birthday, String phone, String country, String adress) {
                
        person.setName(name);
        person.setLastName(lastName);
        person.setBirthday(birthday);
        person.setPhone(phone);
        person.setCountry(country);
        person.setAdress(adress);
        
        personRepository.save(person);
    }

    @Override
    public void deletePerson(Integer id) {
        personRepository.deleteById(id);
    }

    @Override
    public void createPerson(Person person) {
        personRepository.save(person);
    }
    
    @Override
    public void createPeople (List <Person> people) {
        personRepository.saveAll(people);
    }

}
