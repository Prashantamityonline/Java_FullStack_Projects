package com.api.ecom.paycard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactusDTO {

  private String name;
  private String email;
  private String phone;
  private String subject;
  private String message;
  private String date;
  private Boolean active;

}
