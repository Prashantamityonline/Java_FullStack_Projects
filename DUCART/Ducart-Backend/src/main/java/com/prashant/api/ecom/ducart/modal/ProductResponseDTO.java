package com.prashant.api.ecom.ducart.modal;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
    private boolean stock;
    private String description;
    private Integer stockQuantity;
    private List<MultipartFile> pic;
    private boolean active;
}
