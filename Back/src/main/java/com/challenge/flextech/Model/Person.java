
package com.challenge.flextech.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table (name="people")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "people_seq", sequenceName = "people_seq", allocationSize = 1)  
    private Integer id;
    private Date birthday;
    private String lastName;
    private String name;
    private String adress;
    private String phone;
    private String country;
    
}
