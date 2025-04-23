package com.api.ecom.paycard.exception;

import org.springframework.http.HttpStatusCode;

public class ErrorDetails {

  private String errorMessage;

  private HttpStatusCode code;

  public HttpStatusCode getCode() {
    return code;
  }

  public void setCode(HttpStatusCode code) {
    this.code = code;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

}