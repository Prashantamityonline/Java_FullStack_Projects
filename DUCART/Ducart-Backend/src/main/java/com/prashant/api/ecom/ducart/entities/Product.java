package com.prashant.api.ecom.ducart.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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

  @ElementCollection
  private List<String> pic;

  private boolean active;
}
