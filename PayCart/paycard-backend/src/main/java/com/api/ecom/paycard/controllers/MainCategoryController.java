package com.api.ecom.paycard.controllers;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.MainCategory;
import com.api.ecom.paycard.model.MaincategoryDTO;
import com.api.ecom.paycard.services.MainCategoryService;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RestController
@RequestMapping("/maincategory")
public class MainCategoryController {

    @Autowired
    private MainCategoryService mainCategoryService;

    // Create MainCategory with image upload
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // Ensure multipart form-data is expected
    public ResponseEntity<MainCategory> createCategory(
            @RequestPart("data") MaincategoryDTO maincategoryDTO,
            @RequestPart(value = "pic", required = false) MultipartFile file) { // File should be separate
        try {
            MainCategory mainCategory = mainCategoryService.createMainCategory(maincategoryDTO, file);
            return ResponseEntity.ok(mainCategory);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get all MainCategories
    @GetMapping
    public ResponseEntity<List<MainCategory>> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(mainCategoryService.getAllMainCategories());
    }

    // Update MainCategory with image upload
    @PutMapping("/{id}")
    public ResponseEntity<MainCategory> updateCategory(
            @PathVariable Long id,
            @RequestPart("data") MaincategoryDTO maincategoryDTO, // Match frontend key
            @RequestPart(value = "pic", required = false) MultipartFile file) { // Make file optional
        try {
            MainCategory updatedMainCategory = mainCategoryService.updateMainCategory(id, maincategoryDTO, file);
            return ResponseEntity.status(HttpStatus.OK).body(updatedMainCategory);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete MainCategory by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<MainCategory> deleteCategory(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(mainCategoryService.deleteMainCategory(id));
    }
}
