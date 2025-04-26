package com.prashant.api.ecom.ducart.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userid;
  private String name;
  private String username;
  private String email;
  private String phone;
  private String password;
  private String role;
  private String address;
  private String city;
  private String state;
  private String pin;
  private String pic;

}
