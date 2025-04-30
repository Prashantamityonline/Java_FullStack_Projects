package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.prashant.api.ecom.ducart.modal.BrandDTO;
import com.prashant.api.ecom.ducart.modal.BrandResponseDTO;
import com.prashant.api.ecom.ducart.services.BrandService;

@RestController
@RequestMapping("/brand")
public class BrandController {
  @Autowired
  private BrandService brandService;

  // create brand with image
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<BrandResponseDTO> createBrand(@RequestPart("data") String jsonData, // JSON data as a string
      @RequestPart("pic") MultipartFile file) throws IOException {
    // Convert JSON string to java object BrandDTO
    ObjectMapper mapper = new ObjectMapper();
    BrandDTO brandDTO = mapper.readValue(jsonData, BrandDTO.class);
    // call service
    BrandResponseDTO brandResponseDTO = brandService.createBrand(brandDTO, file);
    return ResponseEntity.status(HttpStatus.CREATED).body(brandResponseDTO);
  }

  // get all brands
  @GetMapping
  public ResponseEntity<List<BrandResponseDTO>> getAllBrands() {
    return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllBrands());
  }

  // update brand by id
  @PutMapping("/{id}")
  public ResponseEntity<BrandResponseDTO> updateBrandById(@PathVariable Long id, @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    // Convert JSON string to BrandDTO object
    ObjectMapper mapper = new ObjectMapper();
    BrandDTO brandDTO = mapper.readValue(jsonData, BrandDTO.class);
    // call service layer
    BrandResponseDTO brandResponseDTO = brandService.updateBrandById(id, brandDTO, file);
    return ResponseEntity.status(HttpStatus.OK).body(brandResponseDTO);
  }

  // delete brand by id
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteBrandById(@PathVariable Long id) {
    brandService.deleteBrand(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Brand deleted successfully");
    return ResponseEntity.ok(response);
  }
}
