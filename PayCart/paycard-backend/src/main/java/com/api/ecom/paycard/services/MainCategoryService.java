package com.api.ecom.paycard.services;

import com.api.ecom.paycard.entities.MainCategory;
import com.api.ecom.paycard.model.MaincategoryDTO;
import com.api.ecom.paycard.repository.MainCategoryRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MainCategoryService {

  @Autowired
  private MainCategoryRepository maincategoryRepository;

  // Directory to store uploaded images
  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/maincategories/";

  public MainCategoryService() {
    // Ensure the upload directory exists
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // Create MainCategory with image upload
  public MainCategory createMainCategory(MaincategoryDTO maincategoryDTO, MultipartFile file) throws IOException {
    MainCategory maincategory = new MainCategory();
    BeanUtils.copyProperties(maincategoryDTO, maincategory);

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      maincategory.setPic(relativePath);
    }

    return maincategoryRepository.save(maincategory);
  }

  // Get all MainCategories
  public List<MainCategory> getAllMainCategories() {
    return maincategoryRepository.findAll();
  }

  // Update Maincategory
  public MainCategory updateMainCategory(Long id, MaincategoryDTO maincategoryDTO, MultipartFile file)
      throws IOException {
    MainCategory existingMainCategory = maincategoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Maincategory not found with ID: " + id));

    existingMainCategory.setName(maincategoryDTO.getName());
    existingMainCategory.setActive(maincategoryDTO.getActive());

    // Retain existing image if no new file is provided
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      existingMainCategory.setPic(relativePath);
    } else if (maincategoryDTO.getPic() != null) {
      existingMainCategory.setPic(maincategoryDTO.getPic()); // Retain old image
    }

    return maincategoryRepository.save(existingMainCategory);
  }

  // Delete MainCategory
  public MainCategory deleteMainCategory(Long id) {
    MainCategory maincategory = maincategoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Maincategory not found with ID: " + id));

    // Delete the associated image file if it exists
    if (maincategory.getPic() != null) {
      deleteFile(maincategory.getPic());
    }

    maincategoryRepository.deleteById(id);
    return maincategory;
  }

  // Helper method to save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/maincategories/" + fileName;
  }

  // Helper method to delete a file by its path
  private void deleteFile(String filePath) {
    try {
      Path path = Paths.get(UPLOAD_DIR, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (IOException e) {
      System.err.println("Error deleting file: " + filePath + " - " + e.getMessage());
    }
  }
}
