package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Product;
import com.prashant.api.ecom.ducart.modal.ProductDTO;
import com.prashant.api.ecom.ducart.repositories.ProductRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class ProductService {
  @Autowired
  private ProductRepo productRepo;

  // file upload
  String uploadDir = FileUploadUtil.getUploadDirFor("prodcuts");

  // // create product with image
  // public Product createProduct(ProductDTO productDTO, MultipartFile files)
  // throws IOException {
  // // image upload logic
  // if (files != null && !files.isEmpty()) {
  // String relativePath = saveFile(files);
  // productDTO.setPic(relativePath);
  // }
  // Product product = new Product();
  // BeanUtils.copyProperties(productDTO, product);
  // return productRepo.save(product);
  // }
  // create product with multiple images
  public Product createProduct(ProductDTO productDTO, MultipartFile[] files) throws IOException {

    List<String> imagePaths = new ArrayList<>();

    if (files != null && files.length > 0) {
      for (MultipartFile file : files) {
        if (!file.isEmpty()) {
          String relativePath = saveFile(file);
          imagePaths.add(relativePath);
        }
      }
    }

    // 👇 You should update your ProductDTO and Product entity to handle multiple
    // image paths
    productDTO.setImages(imagePaths); // make sure you have a field called `List<String> images` in DTO

    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);
    return productRepo.save(product);
  }

  // save file logic
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    String filePath = uploadDir + fileName;
    file.transferTo(new File(filePath));
    return "/uploads/products/" + fileName;
  }

  // Get All Products
  public List<Product> getAllProducts() {
    return productRepo.findAll();
  }

  // Update Product
  public Product updateProductById(Long id, ProductDTO productDTO, MultipartFile file) throws IOException {
    // image upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      productDTO.setImages(List.of(relativePath));
    }
    // find existing Product by id and update its properties
    Product existProduct = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));
    productDTO.setName(productDTO.getName());
    productDTO.setMaincategory(productDTO.getMaincategory());
    productDTO.setSubcategory(productDTO.getSubcategory());
    productDTO.setBrand(productDTO.getBrand());
    productDTO.setColor(productDTO.getColor());
    productDTO.setSize(productDTO.getSize());
    productDTO.setBasePrice(productDTO.getBasePrice());
    productDTO.setDiscount(productDTO.getDiscount());
    productDTO.setFinalPrice(productDTO.getFinalPrice());
    productDTO.setStock(productDTO.isStock());
    productDTO.setDescription(productDTO.getDescription());
    productDTO.setStockQuantity(productDTO.getStockQuantity());
    productDTO.setImages(productDTO.getImages());
    productDTO.setActive(productDTO.isActive());

    if (existProduct != null) {
      BeanUtils.copyProperties(productDTO, existProduct);
      return productRepo.save(existProduct);
    } else {
      throw new RuntimeException("Product is not found");
    }
  }

  // Delete Product
  public void deleteProduct(Long id) {
    Product product = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product is not found By Id:" + id));
    if (product != null) {
      if (product.getImages() != null) {
        for (String imagePath : product.getImages()) {
          deleteFile(imagePath);
        }
      }
    }
    productRepo.deleteById(id);
  }

  // Helper Method file delete
  private void deleteFile(String filePath) {
    try {
      Path path = Paths.get(uploadDir, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (Exception e) {
      System.err.println("Error deleting file:" + filePath + "-" + e.getMessage());
    }
  }

}
