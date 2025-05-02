package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupDTO {

  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 15, message = "Name must be between 3 and 15 characters")
  private String name;

  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 15, message = "Username must be between 3 and 15 characters")
  private String username;

  @NotBlank(message = "Email is required")
  @Email(message = "Email should be valid")
  private String email;

  @NotBlank(message = "Phone number is required")
  @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be exactly 10 digits")
  private String phone;

  @NotBlank(message = "Password is required")
  @Size(min = 6, message = "Password must be at least 6 characters")
  private String password;
  @NotBlank(message = "Role is required")
  private String role;
}
