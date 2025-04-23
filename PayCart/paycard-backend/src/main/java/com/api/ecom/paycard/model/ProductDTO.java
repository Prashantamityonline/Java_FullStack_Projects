package com.api.ecom.paycard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
  private String name;
  private String maincategory;
  private String subcategory;
  private String brand;
  private String color;
  private String size;
  private String basePrice;
  private String discount;
  private String finalPrice;
  private Boolean stock;
  private String stockQuantity;
  private String description;
  private Boolean active;
  private String pic;
}
