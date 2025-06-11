package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
  String uploadDir = FileUploadUtil.getUploadDirFor("products");

  // create Product
  public ProductResponseDTO createProduct(ProductDTO productDTO, MultipartFile[] files) throws IOException {
    List<String> relativePaths = saveFiles(files);
    productDTO.setPics(relativePaths);

    Product product = new Product();
    BeanUtils.copyProperties(productDTO, product);

    Product saveProduct = productRepo.save(product);
    return mapToResponseDTO(saveProduct);
  }

  private ProductResponseDTO mapToResponseDTO(Product product) {
    ProductResponseDTO responseDTO = new ProductResponseDTO();
    BeanUtils.copyProperties(product, responseDTO);
    return responseDTO;
  }

  private List<String> saveFiles(MultipartFile[] files) throws IOException {
    List<String> filePaths = new ArrayList<>();
    if (files != null && files.length > 0) {
      for (MultipartFile file : files) {
        if (file != null && !file.isEmpty()) {
          String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
          Path filePath = Path.of(uploadDir, fileName);
          Files.createDirectories(filePath.getParent());
          Files.write(filePath, file.getBytes());
          filePaths.add("/uploads/products/" + fileName);
        }
      }
    }
    return filePaths;
  }

  public List<ProductResponseDTO> getAllProducts() {
    return productRepo.findAll().stream().map(this::mapToResponseDTO).collect(Collectors.toList());
  }

  public ProductResponseDTO getProductById(Long id) {
    Product product = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));
    return mapToResponseDTO(product);
  }

  public ProductResponseDTO updateProductById(Long id, ProductDTO productDTO, MultipartFile[] files)
      throws IOException {
    Product existProduct = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));

    if (files != null && files.length > 0) {
      List<String> updatedPaths = saveFiles(files);
      productDTO.setPics(updatedPaths);
    }

    BeanUtils.copyProperties(productDTO, existProduct);
    Product saveProduct = productRepo.save(existProduct);
    return mapToResponseDTO(saveProduct);
  }

  public void deleteProduct(Long id) {
    Product product = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Product is not found By Id:" + id));
    if (product.getPics() != null) {
      for (String filePath : product.getPics()) {
        deleteFile(filePath);
      }
    }
    productRepo.deleteById(id);
  }

  private void deleteFile(String filePath) {
    try {
      Path path = Path.of(uploadDir, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (Exception e) {
      System.err.println("Error deleting file:" + filePath + "-" + e.getMessage());
    }
  }
}

// package com.prashant.api.ecom.ducart.services;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.beans.BeanUtils;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.prashant.api.ecom.ducart.entities.Product;
// import com.prashant.api.ecom.ducart.modal.ProductDTO;
// import com.prashant.api.ecom.ducart.modal.ProductResponseDTO;
// import com.prashant.api.ecom.ducart.repositories.ProductRepo;
// import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

// @Service
// public class ProductService {
// @Autowired
// private ProductRepo productRepo;
// // file upload
// String uploadDir = FileUploadUtil.getUploadDirFor("products");

// // create Product
// public ProductResponseDTO createProduct(ProductDTO productDTO,
// MultipartFile[] files) throws IOException {
// // save file logic
// List<String> relativePaths = saveFiles(files);
// productDTO.setPic(relativePaths);
// // Convert ProductDTO to Product entity
// Product product = new Product();
// BeanUtils.copyProperties(productDTO, product);

// // save entity to database
// Product saveProduct = productRepo.save(product);

// // Convert Product entity to ProductResponseDTO
// return mapToResponseDTO(saveProduct);
// }

// // Helper method to map Product to ProductResponseDTO
// private ProductResponseDTO mapToResponseDTO(Product product) {
// ProductResponseDTO responseDTO = new ProductResponseDTO();
// BeanUtils.copyProperties(product, responseDTO);
// return responseDTO;
// }

// // Save multiple files logic
// private List<String> saveFiles(MultipartFile[] files) throws IOException {
// List<String> filePaths = new ArrayList<>();
// if (files != null && files.length > 0) {
// for (MultipartFile file : files) {
// if (file != null && !file.isEmpty()) {
// // Generate a unique file name
// String fileName = System.currentTimeMillis() + "_" +
// file.getOriginalFilename();
// Path filePath = Paths.get(uploadDir, fileName);

// // Create parent directory if it doesn't exist
// Files.createDirectories(filePath.getParent());

// // Save the file
// Files.write(filePath, file.getBytes());

// // Add the relative path to the list
// filePaths.add("/uploads/products/" + fileName);
// }
// }
// }
// return filePaths;
// }

// // Get All Products
// public List<ProductResponseDTO> getAllProducts() {
// return
// productRepo.findAll().stream().map(this::mapToResponseDTO).collect(Collectors.toList());
// }

// // Get Product by Id
// public ProductResponseDTO getProductById(Long id) {
// Product product = productRepo.findById(id)
// .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));
// ProductResponseDTO productResponseDTO = new ProductResponseDTO();
// BeanUtils.copyProperties(product, productResponseDTO);
// return productResponseDTO;
// }

// // Update Product
// public ProductResponseDTO updateProductById(Long id, ProductDTO productDTO,
// MultipartFile[] files)
// throws IOException {

// // find existing Product by id and update its properties
// Product existProduct = productRepo.findById(id)
// .orElseThrow(() -> new RuntimeException("Product not found by Id :" + id));
// if (existProduct != null) {
// BeanUtils.copyProperties(productDTO, existProduct);
// // save entity to database
// Product saveProduct = productRepo.save(existProduct);

// // Convert product entity to ProductResponseDTO
// ProductResponseDTO productResponseDTO = mapToResponseDTO(saveProduct);

// return productResponseDTO;
// } else {
// throw new RuntimeException("Product is not found");
// }
// }

// // Delete Product
// public void deleteProduct(Long id) {
// Product product = productRepo.findById(id)
// .orElseThrow(() -> new RuntimeException("Product is not found By Id:" + id));
// if (product != null) {
// if (product.getPic() != null) {
// for (String filePath : product.getPic()) {
// deleteFile(filePath);
// }
// }
// }
// productRepo.deleteById(id);
// }

// // Helper Method file delete
// private void deleteFile(String filePath) {
// try {
// Path path = Paths.get(uploadDir, new File(filePath).getName());
// Files.deleteIfExists(path);
// } catch (Exception e) {
// System.err.println("Error deleting file:" + filePath + "-" + e.getMessage());
// }
// }

// }
