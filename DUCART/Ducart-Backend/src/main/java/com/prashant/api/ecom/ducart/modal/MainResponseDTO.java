package com.prashant.api.ecom.ducart.modal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainResponseDTO {
  private Long id;
  private String name;
  private String pic;
  private Boolean active;

}
