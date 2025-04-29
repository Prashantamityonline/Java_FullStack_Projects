package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Product;
import com.prashant.api.ecom.ducart.modal.ProductDTO;
import com.prashant.api.ecom.ducart.modal.ProductResponseDTO;
import com.prashant.api.ecom.ducart.repositories.ProductRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class ProductService {
  @Autowired
  private ProductRepo productRepo;

  // file upload
  String uploadDir = FileUploadUtil.getUploadDirFor("prodcuts");

  // create Product
  public ProductResponseDTO createProduct(ProductDTO productDTO, MultipartFile[] files) throws IOException {
    // save file logic
    List<String> relativePaths = saveFile(files);
    productDTO.setPic(relativePaths);
    // Convert ProductDTO to Product entity
    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);

    // save entity to database
    Product saveProduct = productRepo.save(product);

    // Convert Product entity to ProductResponseDTO
    ProductResponseDTO productResponseDTO = mapToResponseDTO(saveProduct);

    return productResponseDTO;
  }

  // Helper method to map Product to ProductResponseDTO
  private ProductResponseDTO mapToResponseDTO(Product product) {
    ProductResponseDTO responseDTO = new ProductResponseDTO();
    BeanUtils.copyProperties(product, responseDTO);
    return responseDTO;
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
  public List<ProductResponseDTO> getAllProducts() {
    List<Product> products = productRepo.findAll();
    // Convert List<Product> to List<ProductResponseDTO>
    List<ProductResponseDTO> productResponseDTOs = products.stream()
        .map(this::mapToResponseDTO)
        .collect(Collectors.toList());
    return productResponseDTOs;
  }

  // Get Product by Id
  public ProductResponseDTO getProductById(Long id) {
    Product product = new Product();
    productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));
    ProductResponseDTO productResponseDTO = new ProductResponseDTO();
    BeanUtils.copyProperties(product, productResponseDTO);
    return productResponseDTO;
  }

  // Update Product
  public ProductResponseDTO updateProductById(Long id, ProductDTO productDTO, MultipartFile file) throws IOException {
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
      // save entity to database
      Product saveProduct = productRepo.save(existProduct);

      // Convert product entity to ProductResponseDTO
      ProductResponseDTO productResponseDTO = mapToResponseDTO(saveProduct);

      return productResponseDTO;
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
