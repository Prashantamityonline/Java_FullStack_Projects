package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import com.prashant.api.ecom.ducart.modal.ProductDTO;
import com.prashant.api.ecom.ducart.modal.ProductResponseDTO;
import com.prashant.api.ecom.ducart.services.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  // create product
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<ProductResponseDTO> createProduct(
      @RequestPart("data") String jsonData,
      @RequestPart(value = "pic", required = false) MultipartFile[] files) throws IOException {

    // Convert JSON string to ProductDTO object
    ObjectMapper mapper = new ObjectMapper();
    ProductDTO productDTO = mapper.readValue(jsonData, ProductDTO.class);

    // call service
    ProductResponseDTO productResponseDTO = productService.createProduct(productDTO, files);
    return ResponseEntity.status(HttpStatus.CREATED).body(productResponseDTO);

  }

  // GetAll Product
  @GetMapping
  public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
    return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
  }

  // Get Product by ID
  @GetMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
    // call service
    ProductResponseDTO responseDTO = productService.getProductById(id);
    if (responseDTO != null) {
      return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  // update Product
  @PutMapping("/{id}")
  public ResponseEntity<ProductResponseDTO> updateProductById(@PathVariable Long id,
      @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    ProductDTO productDTO = mapper.readValue(jsonData, ProductDTO.class);
    // call service
    ProductResponseDTO productResponseDTO = productService.updateProductById(id, productDTO, file);
    if (productResponseDTO != null) {
      return ResponseEntity.status(HttpStatus.OK).body(productResponseDTO);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

  }

  // Delete Product
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteById(@PathVariable Long id) {
    productService.deleteProduct(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "Product deleted successfully");
    return ResponseEntity.ok(response);
  }
}
