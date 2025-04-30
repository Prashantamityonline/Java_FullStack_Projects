package com.prashant.api.ecom.ducart.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
  public ResponseEntity<NewsletterResponseDTO> createNewsletter(@RequestBody NewsletterDTO newsletterDTO) {
    // call service
    NewsletterResponseDTO newsletterResponseDTO = newsletterService.createNewsletter(newsletterDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(newsletterResponseDTO);
  }

  // Get All Newsletters
  @GetMapping
  public ResponseEntity<List<NewsletterResponseDTO>> getAllNewsletter() {
    return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getAllNewsLetter());
  }

  // Get newsletter by id
  @GetMapping("/{id}")
  public ResponseEntity<NewsletterResponseDTO> getNewsletter(@PathVariable Long id) {
    NewsletterResponseDTO newsletterResponseDTO = newsletterService.getNewsletterById(id);
    return ResponseEntity.status(HttpStatus.OK).body(newsletterResponseDTO);
  }

  /// Delete newsletter by id
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteNewsletter(@PathVariable Long id) {
    newsletterService.deleteNewsletterById(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Newsletter deleted successfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

}