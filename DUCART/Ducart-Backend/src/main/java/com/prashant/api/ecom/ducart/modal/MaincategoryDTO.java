package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MaincategoryDTO {

  @NotBlank(message = "Name is required")
  private String name;
  @NotBlank(message = "Pic is required")
  private String pic;
  private boolean active;

}
