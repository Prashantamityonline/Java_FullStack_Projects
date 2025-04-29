package com.prashant.api.ecom.ducart.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.prashant.api.ecom.ducart.modal.NewsletterDTO;
import com.prashant.api.ecom.ducart.modal.NewsletterResponseDTO;
import com.prashant.api.ecom.ducart.services.NewsletterService;

@RestController
@RequestMapping("/newsletter")
public class Newsletter {

  private NewsletterService newsletterService;

  // newsletter subscription

  @PostMapping
  public ResponseEntity<NewsletterResponseDTO> saveNewsletter(@RequestBody NewsletterDTO newsletterDTO) {
    // call service
    NewsletterResponseDTO newsletterResponseDTO = newsletterService.saveNewsletter(newsletterDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(newsletterResponseDTO);
  }

  // Get All Newsletters
  @GetMapping
  public ResponseEntity<List<NewsletterResponseDTO>> getAllNewsletter() {
    return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getAllNewsLetter());
  }
}