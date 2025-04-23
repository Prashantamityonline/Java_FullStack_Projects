package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.entities.Product;
import com.prashant.api.ecom.ducart.modal.ProductDTO;
import com.prashant.api.ecom.ducart.services.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  // create product
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Product> createProduct(@RequestPart("data") String JsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    ProductDTO productDTO = mapper.readValue(JsonData, ProductDTO.class);
    Product product = productService.createProduct(productDTO, file);
    return ResponseEntity.status(HttpStatus.CREATED).body(product);

  }

  // GetAll Product
  @GetMapping
  public ResponseEntity<List<Product>> getAllProducts() {
    List<Product> products = productService.getAllProducts();
    return ResponseEntity.status(HttpStatus.OK).body(products);
  }

  // update Product
  @PutMapping
  public ResponseEntity<Product> updateProductById(@PathVariable Long id, @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    ProductDTO productDTO = mapper.readValue(jsonData, ProductDTO.class);
    Product existingProduct = productService.updateProductById(id, productDTO, file);
    BeanUtils.copyProperties(productDTO, existingProduct);
    return ResponseEntity.status(HttpStatus.OK).body(existingProduct);
  }

  // Delete Product
  public ResponseEntity<Void> deleteById(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
