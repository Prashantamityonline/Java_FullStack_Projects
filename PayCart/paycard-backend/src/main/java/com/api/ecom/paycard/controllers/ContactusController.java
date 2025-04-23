package com.api.ecom.paycard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.ecom.paycard.entities.Contactus;
import com.api.ecom.paycard.model.ContactusDTO;
import com.api.ecom.paycard.services.ContactusService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/contactus")
public class ContactusController {
  @Autowired
  private ContactusService contactusService;

  // create contactus
  @PostMapping
  public ResponseEntity<Contactus> createContactus(@RequestBody ContactusDTO contactusDTO) {
    return ResponseEntity.status(HttpStatus.CREATED).body(contactusService.createContactus(contactusDTO));
  }

  // get all contactus
  @GetMapping
  public ResponseEntity<List<Contactus>> getAllContactus() {
    return ResponseEntity.status(HttpStatus.OK).body(contactusService.getAllContactus());
  }

  // get contactus by id
  @GetMapping("/{id}")
  public ResponseEntity<Contactus> getContactus(@PathVariable Integer id) {
    return ResponseEntity.status(HttpStatus.OK).body(contactusService.geContactus(id));
  }

  // update contactus
  @PutMapping("/{id}")
  public ResponseEntity<Contactus> updateContactus(@PathVariable Integer id, @RequestBody Contactus contactus) {
    return ResponseEntity.status(HttpStatus.OK).body(contactusService.updateContactus(contactus, id));
  }

  // delete Contactus
  @DeleteMapping("/{id}")
  public ResponseEntity<Contactus> deleteContactus(@PathVariable Integer id) {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(contactusService.deleteContactus(id));
  }

}
