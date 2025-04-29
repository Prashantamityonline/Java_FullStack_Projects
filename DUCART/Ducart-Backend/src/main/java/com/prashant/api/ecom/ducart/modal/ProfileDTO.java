package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileDTO {
  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 15, message = "Name must be between 3 and 15 characters")
  private String name;
  @NotBlank(message = "Username is required")
  @Size(min = 10, max = 10, message = "Username must be 10 characters")
  private String phone;
  @NotBlank(message = "Address is required")
  private String address;
  @NotBlank(message = "Pin is required")
  private String pin;
  @NotBlank(message = "City is required")
  private String city;
  @NotBlank(message = "State is required")
  private String state;
  @NotBlank(message = "Pic is required")
  private String pic;
}
