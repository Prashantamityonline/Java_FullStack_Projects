package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
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

  // create product with image
  public Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException {
    // image upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      productDTO.setPic(relativePath);
    }
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
      productDTO.setPic(relativePath);
    }
    // find existing Product by id and update its properties
    Product existProduct = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product is not found"));
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
    productRepo.deleteById(id);
  }

}
