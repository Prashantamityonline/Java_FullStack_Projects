package com.api.ecom.paycard.model;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderDTO {
  private Integer userId;
  private String orderStatus;
  private String paymentMode;
  private String paymentStatus;
  private double subtotal;
  private double shipping;
  private double total;
  private Date date;
}
