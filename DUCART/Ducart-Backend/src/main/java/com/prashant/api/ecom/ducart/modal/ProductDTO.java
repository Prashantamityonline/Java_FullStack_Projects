package com.prashant.api.ecom.ducart.modal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO { // For input data
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
  private Double basePrice;

  @NotBlank(message = "discount is required")
  private Double discount;

  @NotBlank(message = "final price is required")
  private Double finalPrice;

  private Boolean stock;

  @NotBlank(message = "description is required")
  private String description;

  @NotBlank(message = "stock quantity is required")
  private Integer stockQuantity;

  @NotNull(message = "Product images are required")
  private List<String> pics;

  private boolean active;
}
