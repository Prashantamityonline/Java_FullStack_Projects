package com.prashant.hotel.microservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.prashant.hotel.microservice.payload.ApiResponse;

@RestControllerAdvice
public class GlobelExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
    String message = exception.getMessage();
    ApiResponse response = ApiResponse.builder().message(message).status(HttpStatus.NOT_FOUND).build();
    return new ResponseEntity<ApiResponse>(response, HttpStatus.NOT_FOUND);
  }

}
