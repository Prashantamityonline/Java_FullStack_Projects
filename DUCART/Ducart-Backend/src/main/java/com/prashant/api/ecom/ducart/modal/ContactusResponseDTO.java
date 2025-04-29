package com.prashant.api.ecom.ducart.modal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactusResponseDTO {
  private Long id;
  private String name;
  private String email;
  private String phone;
  private String subject;
  private String message;
  private String date;
  private boolean active;

}
