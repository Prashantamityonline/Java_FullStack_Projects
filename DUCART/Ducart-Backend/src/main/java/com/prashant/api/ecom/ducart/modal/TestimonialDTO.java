package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TestimonialDTO {
  @NotBlank(message = "Name is required")
  private String name;
  @NotBlank(message = "Message is required")
  private String message;
  @NotBlank(message = "Pic is required")
  private String pic;
  @NotNull(message = "Active status is required")
  private boolean active;

}
