package com.prashant.api.ecom.ducart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.api.ecom.ducart.entities.Contactus;
import com.prashant.api.ecom.ducart.modal.ContactusDTO;
import com.prashant.api.ecom.ducart.services.ContactusService;

@RestController
@RequestMapping("/contactus")
public class ContactusController {
  @Autowired
  private ContactusService contactusService;

  // Endpoint to save contact us details

  @PostMapping
  public ResponseEntity<Contactus> saveContactus(@RequestBody ContactusDTO contactusDTO) {
    Contactus savedContactus = contactusService.saveContactus(contactusDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedContactus);
  }

  // Endpoint to get all contact us details
  @GetMapping
  public ResponseEntity<List<Contactus>> getAllContactus() {
    List<Contactus> contactusList = contactusService.getAllContactus();
    return ResponseEntity.status(HttpStatus.OK).body(contactusList);
  }

}
