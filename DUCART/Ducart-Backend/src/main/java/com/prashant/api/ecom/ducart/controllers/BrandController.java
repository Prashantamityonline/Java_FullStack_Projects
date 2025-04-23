package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.BeanUtils;
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
import com.prashant.api.ecom.ducart.entities.Brand;
import com.prashant.api.ecom.ducart.modal.BrandDTO;
import com.prashant.api.ecom.ducart.services.BrandService;

@RestController
@RequestMapping("/brand")
public class BrandController {
  @Autowired
  private BrandService brandService;

  // create brand with image
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Brand> createBrand(@RequestPart("data") String jsonData, // JSON data as a string
      @RequestPart("pic") MultipartFile file) throws IOException {
    // Convert JSON string to BrandDTO object
    ObjectMapper mapper = new ObjectMapper();
    BrandDTO brandDTO = mapper.readValue(jsonData, BrandDTO.class);
    Brand brand = brandService.createBrand(brandDTO, file);
    return ResponseEntity.status(HttpStatus.CREATED).body(brand);
  }

  // get all brands
  @GetMapping
  public ResponseEntity<List<Brand>> getAllBrands() {
    List<Brand> brands = brandService.getAllBrands();
    return ResponseEntity.ok(brands);
  }

  // update brand by id
  @PutMapping("/{id}")
  public ResponseEntity<Brand> updateBrandById(@PathVariable Long id, @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    // Convert JSON string to BrandDTO object
    ObjectMapper mapper = new ObjectMapper();
    BrandDTO brandDTO = mapper.readValue(jsonData, BrandDTO.class);

    // Update the brand with the new data
    Brand existingBrand = brandService.updateBrandById(id, brandDTO, file);

    BeanUtils.copyProperties(brandDTO, existingBrand, "id");

    return ResponseEntity.ok(existingBrand);
  }

  // delete brand by id
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBrandById(@PathVariable Long id) {
    brandService.deleteBrandById(id);
    return ResponseEntity.noContent().build();
  }
}
