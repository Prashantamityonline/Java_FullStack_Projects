package com.api.ecom.paycard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.SubCategory;
import com.api.ecom.paycard.model.SubcategoryDTO;
import com.api.ecom.paycard.services.SubCategoryService;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
    RequestMethod.DELETE })
@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {

  @Autowired
  private SubCategoryService subcategoryService;

  // create category
  @PostMapping(consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<SubCategory> createSubcategory(
      @RequestPart("data") SubcategoryDTO subcategoryDTO,
      @RequestPart(value = "pic", required = false) MultipartFile file) {
    try {
      // Debugging logs
      System.out.println("Received Data: " + subcategoryDTO);
      if (file != null) {
        System.out.println("Received File: " + file.getOriginalFilename());
      }
      SubCategory savedSubcategory = subcategoryService.createSubcategory(subcategoryDTO, file);
      return ResponseEntity.ok(savedSubcategory);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // get all category
  @GetMapping
  public ResponseEntity<List<SubCategory>> getAllSubcategories() {
    return ResponseEntity.status((HttpStatus.OK)).body(subcategoryService.getAllSubcategories());
  }

  // get categoryById
  @GetMapping("/{id}")
  public ResponseEntity<SubCategory> getSubcategoryById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(subcategoryService.getSubcategoryById(id));
  }

  // update category
  @PutMapping("/{id}")
  public ResponseEntity<SubCategory> updateSubcategory(@PathVariable Long id,
      @RequestPart("data") SubcategoryDTO subDTO,
      @RequestPart(value = "pic", required = false) MultipartFile file) {
    try {
      SubCategory updatedSubcategory = subcategoryService.updateSubcategory(id, subDTO, file);
      return ResponseEntity.status(HttpStatus.OK).body(updatedSubcategory);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // delete category
  @DeleteMapping("/{id}")
  public ResponseEntity<SubCategory> deleteCategory(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(subcategoryService.deleteSubcategory(id));
  }
}
