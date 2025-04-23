package com.prashant.api.ecom.ducart.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.util.Date;

@ControllerAdvice
public class GlobelExceptionHandler {
  // hanle all exception globally
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDetails> handleAllException(ExceptionHandler ex, WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setDetails(request.getDescription(false));
    errorDetails.setMessage(errorDetails.getMessage());
    errorDetails.setTimestamp(String.valueOf(System.currentTimeMillis()));
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDetails);

  }

  // // handle specific exception
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorDetails> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setTimestamp(new Date().toString());
    errorDetails.setMessage(ex.getMessage());
    errorDetails.setDetails(request.getDescription(false));
    return ResponseEntity.status(0).body(errorDetails);
  }
}
