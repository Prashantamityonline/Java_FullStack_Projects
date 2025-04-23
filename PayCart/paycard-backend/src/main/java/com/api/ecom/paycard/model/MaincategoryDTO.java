package com.api.ecom.paycard.model;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MaincategoryDTO {
  @NotEmpty(message = "Name is Mandatory")
  private String name;
  @NotEmpty(message = "pic is Mandatory")
  private String pic;
  private Boolean active;

}
