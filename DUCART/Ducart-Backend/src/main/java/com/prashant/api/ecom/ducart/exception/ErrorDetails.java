package com.prashant.api.ecom.ducart.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ErrorDetails {
  private String message;
  private String details;
  private String timestamp;

}
