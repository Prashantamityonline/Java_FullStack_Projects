package com.api.ecom.paycard.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.ecom.paycard.entities.Checkout;
import com.api.ecom.paycard.model.CheckoutDTO;
import com.api.ecom.paycard.repository.CheckoutRepository;

@Service
public class CheckoutService {
  @Autowired
  private CheckoutRepository checkoutRepository;

  // create checkout
  public Checkout createCheckout(CheckoutDTO checkoutDTO) {
    Checkout checkout = new Checkout();
    BeanUtils.copyProperties(checkoutDTO, checkout);
    return checkoutRepository.save(checkout);
  }

  // GetAll checkout Service
  public List<Checkout> getAllCheckout() {
    return checkoutRepository.findAll();
  }

  // Get checkout by id
  public Checkout getCheckout(Integer id) {
    return checkoutRepository.findById(id).orElseThrow(() -> new RuntimeException("Checkout not found by id:" + id));
  }

  // update checkout
  public Checkout updateCheckout(Integer id, Checkout checkout) {
    Checkout saveCheckout = checkoutRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Checkout not found by id :" + id));
    saveCheckout.setUser(checkout.getUser());
    saveCheckout.setDate(checkout.getDate());
    saveCheckout.setOrderStatus(checkout.getOrderStatus());
    saveCheckout.setPaymentStatus(checkout.getPaymentStatus());
    saveCheckout.setShipping(checkout.getShipping());
    saveCheckout.setSubtotal(checkout.getSubtotal());
    saveCheckout.setTotal(checkout.getTotal());

    return checkoutRepository.save(saveCheckout);

  }

  // delete checkout
  public Checkout deleteCheckout(Integer id) {
    Checkout checkout = checkoutRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Checkout not found by id : " + id));
    checkoutRepository.deleteById(id);
    return checkout;
  }
}
