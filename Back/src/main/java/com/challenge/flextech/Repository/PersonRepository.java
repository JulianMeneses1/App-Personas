package com.challenge.flextech.Repository;

import com.challenge.flextech.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PersonRepository extends JpaRepository <Person, Integer> {
//    public Person findByName (String name);
}
