package com.prashant.api.ecom.ducart.modal;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO { // For output data
    private Long id;
    private String name;
    private String maincategory;
    private String subcategory;
    private String brand;
    private String color;
    private String size;
    private Double basePrice;
    private Double discount;
    private Double finalPrice;
    private Boolean stock;
    private String description;
    private Integer stockQuantity;
    private List<String> pic;
    private Boolean active;
}
