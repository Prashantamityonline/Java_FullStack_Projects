package com.api.ecom.paycard.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.Brand;
import com.api.ecom.paycard.model.BrandDTO;
import com.api.ecom.paycard.services.BrandService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/brand")
public class BrandControlller {

  @Autowired
  private BrandService brandService;

  // create brand
  @PostMapping(consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<BrandDTO> createBrand(
      @RequestPart("data") BrandDTO brandDTO,
      @RequestPart(value = "pic", required = false) MultipartFile file) {
    try {
      // Debugging logs
      System.out.println("Received Data: " + brandDTO);
      if (file != null) {
        System.out.println("Received File: " + file.getOriginalFilename());
      }
      BrandDTO savedBrand = brandService.createBrand(brandDTO, file);
      return ResponseEntity.ok(savedBrand);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // Get brand by ID
  @GetMapping("/{id}")
  public ResponseEntity<Brand> getBrandById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.getBrandById(id));
  }

  // get all brands
  @GetMapping
  public ResponseEntity<List<Brand>> getAllBrands() {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllBrands());
  }

  // update brand
  @PutMapping("/{id}")
  public ResponseEntity<Brand> updateBrand(@PathVariable Long id, @RequestBody Brand brand) {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.updateBrand(id, brand));
  }

  // delete brand
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
    brandService.deleteBrand(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
