package com.api.ecom.paycard.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartItemDTO {
  private Integer userId;
  private Integer productId;
  private String name;
  private String brand;
  private String color;
  private String size;
  private Integer qty;
  private double price;
  private double total;
  private int stockQuantity;
}
