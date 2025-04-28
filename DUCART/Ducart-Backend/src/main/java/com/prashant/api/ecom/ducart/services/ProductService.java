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

  // create Product
  public Product createProduct(ProductDTO productDTO, MultipartFile[] files) throws IOException {
    List<String> relativePaths = saveFile(files);
    productDTO.setPic(relativePaths);
    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);

    return productRepo.save(product);
  }

  // Save multiple files logic
  private List<String> saveFile(MultipartFile[] files) throws IOException {
    List<String> filePaths = new ArrayList<>();
    if (files != null && files.length > 0) {
      for (MultipartFile file : files) {
        if (file != null && !file.isEmpty()) {
          // Generate a unique file name
          String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
          Path filePath = Paths.get(uploadDir, fileName);

          // Create parent directory if it doesn't exist
          Files.createDirectories(filePath.getParent());

          // Save the file
          Files.write(filePath, file.getBytes());

          // Add the relative path to the list
          filePaths.add("/uploads/products/" + fileName);
        }
      }
    }
    return filePaths;
  }

  // Get All Products
  public List<Product> getAllProducts() {
    return productRepo.findAll();
  }

  // Update Product
  public Product updateProductById(Long id, ProductDTO productDTO, MultipartFile file) throws IOException {
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
    productDTO.setPic(productDTO.getPic());
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
      if (product.getPic() != null) {
        for (String filePath : product.getPic()) {
          deleteFile(filePath);
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
