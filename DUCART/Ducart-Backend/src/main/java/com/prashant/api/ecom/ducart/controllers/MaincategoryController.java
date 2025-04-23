package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.entities.Maincategory;
import com.prashant.api.ecom.ducart.modal.MaincategoryDTO;
import com.prashant.api.ecom.ducart.services.MaincategoryService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;

@RestController
@RequestMapping("/maincategory")
public class MaincategoryController {

  @Autowired
  private MaincategoryService maincategoryService;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // Ensure multipart form-data is expected
  public ResponseEntity<Maincategory> createMaincategory(
      @RequestPart(value = "data") String jsonData, // JSON data as a string
      @RequestPart(value = "pic") MultipartFile file) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      MaincategoryDTO maincategoryDTO = mapper.readValue(jsonData, MaincategoryDTO.class);
      Maincategory maincategory = maincategoryService.createMaincategory(maincategoryDTO, file);
      return ResponseEntity.ok(maincategory);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // Get all MainCategories
  @GetMapping
  public ResponseEntity<List<Maincategory>> getAllMaincategories() {
    return ResponseEntity.status(HttpStatus.OK).body(maincategoryService.getAllMaincategories());
  }

  // Update MainCategory by ID
  @PutMapping("/{id}")
  public ResponseEntity<Maincategory> updateMaincategoryById(@PathVariable Long id,
      @RequestPart(value = "data") String jsonData,
      // JSON data as a string
      @RequestPart("pic") MultipartFile file) {
    try {
      // Convert JSON string to MaincategoryDTO object
      ObjectMapper mapper = new ObjectMapper();
      MaincategoryDTO maincategoryDTO = mapper.readValue(jsonData, MaincategoryDTO.class);
      // Update Maincategory
      Maincategory updatedMaincategory = maincategoryService.updateMaincategoryById(id, maincategoryDTO, file);
      return ResponseEntity.ok(updatedMaincategory);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // Delete MainCategory by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMaincategoryById(@PathVariable Long id) {
    maincategoryService.deleteMaincategoryById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
