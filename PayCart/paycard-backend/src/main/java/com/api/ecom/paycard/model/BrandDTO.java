package com.api.ecom.paycard.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class BrandDTO {

  private Long id;

  @NotEmpty(message = "Name is Mandatory")
  @Column(unique = true, nullable = false)
  private String name;

  @NotEmpty(message = "Pic is mandatory")
  private String pic;

  @NotNull(message = "Active status is required")
  private Boolean active;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPic() {
    return pic;
  }

  public void setPic(String pic) {
    this.pic = pic;
  }

  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }

  @Override
  public String toString() {
    return "BrandDTO [ name=" + name + ", pic=" + pic + ", active=" + active + "]";
  }

}
