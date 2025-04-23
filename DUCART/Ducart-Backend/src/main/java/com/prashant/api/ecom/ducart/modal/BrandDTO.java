package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BrandDTO {
  @NotBlank(message = "Brand name is required")
  private String name;
  @NotBlank(message = "Brand picture is required")
  private String pic;
  @NotNull(message = "Brand active status is required")
  private boolean active;
}
