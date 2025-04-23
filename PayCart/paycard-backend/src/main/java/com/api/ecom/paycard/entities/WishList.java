package com.api.ecom.paycard.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class WishList {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private Integer userId;
  private Integer productId;

  @Transient
  private String name;
  @Transient
  private String brand;
  @Transient
  private String color;
  @Transient
  private String size;
  @Transient
  private double price;
  @Transient
  private int stockQuantity;
  @Transient
  private String pic;

}
