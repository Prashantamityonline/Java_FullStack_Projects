package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.entities.Subcategory;
import com.prashant.api.ecom.ducart.modal.SubcategoryDTO;
import com.prashant.api.ecom.ducart.services.SubcategoryService;

@RestController
@RequestMapping("/subcategory")
public class SubcategoryController {
  @Autowired
  private SubcategoryService subcategoryService;

  // create subcategory
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Subcategory> createSubcategory(@RequestPart("data") String jsonData,
      SubcategoryDTO subcategoryDTO,
      @RequestPart("pic") MultipartFile file) {
    try {
      // Convert JSON string to SubcategoryDTO object
      ObjectMapper mapper = new ObjectMapper();
      subcategoryDTO = mapper.readValue(jsonData, SubcategoryDTO.class);
      Subcategory subcategory = subcategoryService.createSubcategory(subcategoryDTO, file);
      return ResponseEntity.status(HttpStatus.CREATED).body(subcategory);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

  }

  // Get all subcategories
  @GetMapping
  public ResponseEntity<List<Subcategory>> getAllSubcategories() {
    return ResponseEntity.status(HttpStatus.OK).body(subcategoryService.getAllSubcategories());
  }

  // Update subcategory by ID
  @PutMapping("/{id}")
  public ResponseEntity<Subcategory> updateSubcategoryById(@PathVariable Long id,
      @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) {
    try {
      // Convert JSON string to SubcategoryDTO object
      ObjectMapper mapper = new ObjectMapper();
      SubcategoryDTO subcategoryDTO = mapper.readValue(jsonData, SubcategoryDTO.class);

      // Update subcategory
      Subcategory updatedSubcategory = subcategoryService.updateSubcategoryById(id, subcategoryDTO, file);
      return ResponseEntity.status(HttpStatus.OK).body(updatedSubcategory);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // Delete subcategory by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteSubcategoryById(@PathVariable Long id) {
    subcategoryService.deleteSubcategoryById(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
