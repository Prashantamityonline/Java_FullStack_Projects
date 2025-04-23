package com.api.ecom.paycard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.ecom.paycard.entities.Checkout;
import com.api.ecom.paycard.model.CheckoutDTO;
import com.api.ecom.paycard.services.CheckoutService;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RestController
@RequestMapping("/checkout")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;

    // create checkout
    @PostMapping
    public ResponseEntity<Checkout> crateCheckout(@RequestBody CheckoutDTO checkoutDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(checkoutService.createCheckout(checkoutDTO));

    }

    // getAll Checkout
    @GetMapping
    public ResponseEntity<List<Checkout>> getAllCheckouts() {
        return ResponseEntity.status(HttpStatus.OK).body(checkoutService.getAllCheckout());
    }

    // get checkout by id
    @GetMapping("/{id}")
    public ResponseEntity<Checkout> getCheckout(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(checkoutService.getCheckout(id));
    }

    // update checkout
    @PutMapping("/{id}")
    public ResponseEntity<Checkout> updateCheckout(@PathVariable Integer id, Checkout checkout) {
        return ResponseEntity.status(HttpStatus.OK).body(checkoutService.updateCheckout(id, checkout));
    }

    // delete checkout
    @DeleteMapping("/{id}")
    public ResponseEntity<Checkout> deleteCheckout(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(checkoutService.deleteCheckout(id));
    }

}
