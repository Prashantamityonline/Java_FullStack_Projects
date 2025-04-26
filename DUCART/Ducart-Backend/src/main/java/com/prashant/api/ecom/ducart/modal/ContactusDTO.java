package com.prashant.api.ecom.ducart.modal;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactusDTO {

  @NotBlank(message = "Name is required")
  private String name;
  @NotBlank(message = "Email is required")
  private String email;
  @NotBlank(message = "Phone Number is required")
  private String phone;
  @NotBlank(message = "Subject is required")
  private String subject;
  @NotBlank(message = "Message is required")
  private String message;
  @NotBlank(message = "Date is required")
  private Date date;
  private boolean active;

}
