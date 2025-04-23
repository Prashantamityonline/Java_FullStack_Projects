package com.api.ecom.paycard.model;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutDTO {
  private String user;
  private String orderStatus;
  private String paymentStatus;
  private String subtotal;
  private String shipping;
  private String total;
  private Date date;
}
