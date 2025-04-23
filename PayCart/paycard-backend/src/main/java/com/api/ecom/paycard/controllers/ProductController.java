package com.api.ecom.paycard.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.Product;
import com.api.ecom.paycard.model.ProductDTO;
import com.api.ecom.paycard.services.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  // Get All Product
  @GetMapping
  public ResponseEntity<List<Product>> getAllProduct() {
    return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
  }

  // Create Product
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Product> createProduct(@RequestPart("data") ProductDTO productDTO,
      @RequestPart(value = "pic", required = false) MultipartFile file) {
    try {
      // Debugging logs
      System.out.println("Received Data:" + productDTO);

      if (file != null) {
        // file debugging logs
        System.out.println("Received file:" + file.getOriginalFilename());

      }
      return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productDTO, file));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

  }

  // get product By id
  @GetMapping("/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable Integer id) {
    return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(id));
  }

  // update Product
  @PutMapping("/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable Integer id,
      @RequestBody Product product, MultipartFile file) throws IOException {
    return ResponseEntity.status(HttpStatus.OK).body(productService.updateProduct(id,
        product, file));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProdcut(@PathVariable Integer id) {
    productService.deleteProduct(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

}
