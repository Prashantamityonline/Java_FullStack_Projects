package com.prashant.api.ecom.ducart.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.prashant.api.ecom.ducart.modal.NewsletterDTO;
import com.prashant.api.ecom.ducart.services.NewsletterService;

@RestController
@RequestMapping("/newsletter")
public class Newsletter {

  private NewsletterService newsletterService;

  // newsletter subscription

  @PostMapping
  public ResponseEntity<String> saveNewsletter(@RequestBody NewsletterDTO newsletterDTO) {
    try {
      newsletterService.saveNewsletter(newsletterDTO);
      return ResponseEntity.ok("Subscribed successfully");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error subscribing to newsletter: " + e.getMessage());
    }
  }
}