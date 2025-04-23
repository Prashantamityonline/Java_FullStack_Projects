package com.api.ecom.paycard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WishListDTO {

  private Integer userId;
  private Integer productId;
  private String name;
  private String brand;
  private String color;
  private String size;
  private double price;
  private int stockQuantity;
  private String pic;
}
