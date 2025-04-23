package com.api.ecom.paycard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubcategoryDTO {
  private String name;
  private String pic;
  private Boolean active;

}
