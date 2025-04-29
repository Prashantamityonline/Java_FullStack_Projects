package com.prashant.api.ecom.ducart.modal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {
  private String name;
  private String phone;
  private String address;
  private String pin;
  private String city;
  private String state;
  private String pic;

}
