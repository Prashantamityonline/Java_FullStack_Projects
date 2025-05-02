package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {

  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 15, message = "Name must be between 3 and 15 characters")
  private String name;

  @NotBlank(message = "Phone number is required")
  @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be exactly 10 digits")
  private String phone;

  @NotBlank(message = "Address is required")
  private String address;

  @NotBlank(message = "Pin is required")
  @Pattern(regexp = "^[1-9][0-9]{5}$", message = "Pin must be a 6-digit number")
  private String pin;

  @NotBlank(message = "City is required")
  private String city;

  @NotBlank(message = "State is required")
  private String state;

  @NotBlank(message = "Picture is required")
  private String pic;
}
