package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.modal.MainResponseDTO;
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
  public ResponseEntity<MainResponseDTO> createMaincategory(
      @RequestPart(value = "data") String jsonData, // JSON data as a string
      @RequestPart(value = "pic") MultipartFile file) {
    try {
      // Convert JsonData to Java Object
      ObjectMapper mapper = new ObjectMapper();
      MaincategoryDTO maincategoryDTO = mapper.readValue(jsonData, MaincategoryDTO.class);
      // call service
      MainResponseDTO mainResponseDTO = maincategoryService.createMaincategory(maincategoryDTO, file);
      // response return
      return ResponseEntity.status(HttpStatus.CREATED).body(mainResponseDTO);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // Get all MainCategories
  @GetMapping
  public ResponseEntity<List<MainResponseDTO>> getAllMaincategories() {
    return ResponseEntity.status(HttpStatus.OK).body(maincategoryService.getAllMaincategories());
  }

  @PutMapping("/{id}")
  public ResponseEntity<MainResponseDTO> updateMaincategoryById(
      @PathVariable Long id,
      @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) {
    try {
      // convert json data into java object
      ObjectMapper mapper = new ObjectMapper();
      MaincategoryDTO maincategoryDTO = mapper.readValue(jsonData, MaincategoryDTO.class);
      // call service
      MainResponseDTO mainResponseDTO = maincategoryService.updateMaincategoryById(id, maincategoryDTO, file);
      return ResponseEntity.status(HttpStatus.OK).body(mainResponseDTO);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // Delete MainCategory by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteMaincategoryById(@PathVariable Long id) {
    maincategoryService.deleteMaincategory(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Maincategory deleted succesfully");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
