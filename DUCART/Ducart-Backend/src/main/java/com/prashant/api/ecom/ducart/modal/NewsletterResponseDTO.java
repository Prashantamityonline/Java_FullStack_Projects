package com.prashant.api.ecom.ducart.modal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsletterResponseDTO {
  private Long id;
  private String email;
  private String date;
  private boolean active;

}
