package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SubcategoryDTO {
  @NotBlank(message = "Name is required")
  private String name;
  @NotBlank(message = "Pic is required")
  private String pic;
  private boolean active;

}
