package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductDTO {
  @NotBlank(message = "Product name is required")
  private String name;
  @NotBlank(message = "maincategory name is required")
  private String maincategory;
  @NotBlank(message = "subcategory name is required")
  private String subcategory;
  @NotBlank(message = "brand name is required")
  private String brand;
  @NotBlank(message = "color name is required")
  private String color;
  @NotBlank(message = "size is required")
  private String size;
  @NotBlank(message = "base price is required")
  private String basePrice;
  @NotBlank(message = "discount  is required")
  private String discount;
  @NotBlank(message = "final price is required")
  private String finalPrice;
  @NotNull(message = "stock active status is required")
  private boolean stock;
  @NotBlank(message = "description is required")
  private String description;
  @NotBlank(message = "stock quantity is required")
  private String stockQuantity;
  @NotBlank(message = "pic is required")
  private String pic;
  @NotNull(message = "product active status is required")
  private boolean active;
}
