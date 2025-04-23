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

import com.api.ecom.paycard.entities.SubCategory;
import com.api.ecom.paycard.model.SubcategoryDTO;
import com.api.ecom.paycard.repository.SubCategoryRepository;

import org.springframework.beans.BeanUtils;

@Service
public class SubCategoryService {

  @Autowired
  private SubCategoryRepository serviceRepository;

  // Directory to store uploaded images
  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/subcategory/";

  public SubCategoryService() {
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // Helper method to save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);

    System.out.println("Saving file to: " + filePath.toString()); // Debugging log

    Files.write(filePath, file.getBytes());
    return "/uploads/subcategory/" + fileName;
  }

  // Create subcategory with image upload
  public SubCategory createSubcategory(SubcategoryDTO subcategoryDTO, MultipartFile file) throws IOException {
    SubCategory subcategory = new SubCategory();
    BeanUtils.copyProperties(subcategoryDTO, subcategory);

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      subcategory.setPic(relativePath);
    }

    return serviceRepository.save(subcategory);
  }

  // Get all subcategories
  public List<SubCategory> getAllSubcategories() {
    return serviceRepository.findAll();
  }

  // Get subcategory by ID
  public SubCategory getSubcategoryById(Long id) {
    return serviceRepository.findById(id).orElseThrow(() -> new RuntimeException("Subcategory not found"));
  }

  // Update subcategory
  public SubCategory updateSubcategory(Long id, SubcategoryDTO subDTO, MultipartFile file) throws IOException {
    SubCategory existSubcategory = serviceRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory not found"));

    existSubcategory.setName(subDTO.getName());
    existSubcategory.setActive(subDTO.getActive());

    // Retain existing image if no new file is provided
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      existSubcategory.setPic(relativePath);
    } else if (subDTO.getPic() != null) {
      existSubcategory.setPic(subDTO.getPic()); // Retain old image
    }

    return serviceRepository.save(existSubcategory);
  }

  // Delete subcategory
  public SubCategory deleteSubcategory(Long id) {
    SubCategory subcategory = serviceRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory not found"));

    // Delete the associated image file if it exists
    if (subcategory.getPic() != null) {
      deleteFile(subcategory.getPic());
    }

    serviceRepository.deleteById(id);
    return subcategory;
  }

  // Helper method to delete a file by its path
  private void deleteFile(String filePath) {
    try {
      // Extract file name from the path
      String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
      Path path = Paths.get(UPLOAD_DIR, fileName);

      Files.deleteIfExists(path);
    } catch (IOException e) {
      System.err.println("Error deleting file: " + filePath + " - " + e.getMessage());
    }
  }
}
