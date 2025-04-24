package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Subcategory;
import com.prashant.api.ecom.ducart.modal.SubcategoryDTO;
import com.prashant.api.ecom.ducart.repositories.SubcateogryRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class SubcategoryService {

  @Autowired
  private SubcateogryRepo subcategoryRepo;

  // file upload directory
  String uploadDir = FileUploadUtil.getUploadDirFor("subcategories");

  // Create Subcategory
  public Subcategory createSubcategory(SubcategoryDTO subcategoryDTO, MultipartFile file) throws IOException {
    // File upload Logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      subcategoryDTO.setPic(relativePath);
    }
    Subcategory subcategory = new Subcategory();
    BeanUtils.copyProperties(subcategoryDTO, subcategory);
    return subcategoryRepo.save(subcategory);
  }

  // Save file to the server and return the relative path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    String filePath = uploadDir + fileName;
    file.transferTo(new File(filePath));
    return "/uploads/subcategories/" + fileName;
  }

  // All subcategories
  public List<Subcategory> getAllSubcategories() {
    return subcategoryRepo.findAll();
  }

  // Update subcategory by ID
  public Subcategory updateSubcategoryById(Long id, SubcategoryDTO subcategoryDTO, MultipartFile file)
      throws IOException {
    // File upload Logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      subcategoryDTO.setPic(relativePath);
    }
    // Find existing subcategory by ID and update its properties
    Subcategory existingSubcategory = subcategoryRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory is not found"));
    subcategoryDTO.setName(subcategoryDTO.getName());
    subcategoryDTO.setPic(subcategoryDTO.getPic());
    subcategoryDTO.setActive(subcategoryDTO.isActive());
    if (existingSubcategory != null) {
      BeanUtils.copyProperties(subcategoryDTO, existingSubcategory, "id");
      return subcategoryRepo.save(existingSubcategory);
    } else {
      throw new RuntimeException("Subcategory not found");
    }

  }

  // Delete subcategory by ID
  public void deleteSubcategoryById(Long id) {
    Subcategory subcategory = subcategoryRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Subcategory not found by id:" + id));
    if (subcategory.getPic() != null) {
      deleteFile(subcategory.getPic());
    }
    subcategoryRepo.deleteById(id);
  }

  // Helper method to delete a file by its path
  private void deleteFile(String filePath) {
    try {
      Path path = Paths.get(uploadDir, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (IOException e) {
      System.err.println("Error deleting file: " + filePath + " - " + e.getMessage());
    }
  }
}
