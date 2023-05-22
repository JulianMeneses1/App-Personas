

package com.challenge.flextech.Service;

import com.challenge.flextech.Model.Person;
import java.util.Date;
import java.util.List;


public interface IPersonService {
    public List<Person> getPeople ();
    
//    public Person getPerson(Integer id); 
//    
//    public Person getPersonByName (String name);
    
    public void editPerson(Person person, String name, String lastName, Date birthday, String phone, 
                                String country, String adress);
    
    public void deletePerson (Integer id);
    
    public void createPerson (Person person);
    
    public void createPeople (List <Person> people);
}
