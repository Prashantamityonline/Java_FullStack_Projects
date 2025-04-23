package com.api.ecom.paycard.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

  // Handle Validation Errors
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorDetails> handleValidationErrors(MethodArgumentNotValidException ex, WebRequest request) {
    Map<String, String> errors = new HashMap<>();

    // Collect validation errors
    ex.getBindingResult().getAllErrors().forEach(error -> {
      if (error instanceof FieldError) {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
      } else {
        String globalError = error.getDefaultMessage();
        errors.put("Error", globalError);
      }
    });

    // Build custom error response
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setCode(HttpStatus.BAD_REQUEST);
    errorDetails.setErrorMessage(errors.toString());
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
  }

  // Handle General Exceptions
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDetails> handleGeneralError(Exception ex, WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
    errorDetails.setErrorMessage("Generic Error occurred: " + ex.getMessage());
    return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // Handle IllegalArgumentException
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorDetails> handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {
    ErrorDetails errorDetails = new ErrorDetails();
    errorDetails.setCode(HttpStatus.BAD_REQUEST);
    errorDetails.setErrorMessage(ex.getMessage());
    return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
  }
}
