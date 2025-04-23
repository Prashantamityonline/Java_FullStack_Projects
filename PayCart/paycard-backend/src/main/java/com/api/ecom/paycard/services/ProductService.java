package com.api.ecom.paycard.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.Product;
import com.api.ecom.paycard.model.ProductDTO;
import com.api.ecom.paycard.repository.ProductRepository;

import org.springframework.beans.BeanUtils;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  // Directory to store uploaded images
  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/products/";

  public ProductService() {
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // create product
  public Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException {
    if (productRepository.existsByName(productDTO.getName())) {
      throw new IllegalArgumentException("This Product Already exists");
    }

    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);
    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      product.setPic(relativePath);
    }
    return productRepository.save(product);
  }

  // Method to save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);

    System.out.println("Saving file to:" + filePath.toString()); // Debugging log
    Files.write(filePath, file.getBytes());

    return "/uploads/products" + fileName;
  }

  // get all products
  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  // get product by id
  public Product getProductById(Integer id) {
    return productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found"));
  }

  // update product
  public Product updateProduct(Integer id, Product product, MultipartFile file) throws IOException {
    Product savedProduct = productRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    savedProduct.setName(product.getName());
    savedProduct.setMaincategory(product.getMaincategory());
    savedProduct.setSubcategory(product.getSubcategory());
    savedProduct.setSize(product.getSize());
    savedProduct.setBasePrice(product.getBasePrice());
    savedProduct.setBrand(product.getBrand());
    savedProduct.setColor(product.getColor());
    savedProduct.setFinalPrice(product.getFinalPrice());
    savedProduct.setDiscount(product.getDiscount());
    savedProduct.setStock(product.getStock());
    savedProduct.setStockQuantity(product.getStockQuantity());
    savedProduct.setPic(product.getPic());
    savedProduct.setActive(product.getActive());

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      savedProduct.setPic(relativePath);
    }
    return productRepository.save(product);
  }

  // delete product
  public void deleteProduct(Integer id) {
    if (!productRepository.existsById(id)) {
      throw new IllegalArgumentException("Product not found");
    }
    productRepository.deleteById(id);
  }
}
