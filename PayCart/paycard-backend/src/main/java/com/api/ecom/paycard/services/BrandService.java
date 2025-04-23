package com.api.ecom.paycard.services;

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

import com.api.ecom.paycard.entities.Brand;
import com.api.ecom.paycard.model.BrandDTO;
import com.api.ecom.paycard.repository.BrandRepository;

@Service
public class BrandService {
  @Autowired
  private BrandRepository brandRepository;

  // Directory to store uploaded images
  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/brands/";

  public BrandService() {
    // Ensure the upload directory exists
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // create brand
  public BrandDTO createBrand(BrandDTO brandDTO, MultipartFile file) throws IOException {

    if (brandRepository.existsByName(brandDTO.getName())) {
      throw new IllegalArgumentException("Brand is already taken");
    }
    if (brandRepository.existsByPic(brandDTO.getPic())) {
      throw new IllegalArgumentException("Pic is already registered");
    }

    Brand brand = new Brand();
    BeanUtils.copyProperties(brandDTO, brand);
    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brand.setPic(relativePath);
    }

    Brand brandCreated = brandRepository.save(brand);

    brandDTO.setId(brandCreated.getId());
    return brandDTO;

  }

  // save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);
    Files.write(filePath, file.getBytes());

    return "/uploads/brands/" + fileName;
  }

  // Get all brands
  public List<Brand> getAllBrands() {
    return brandRepository.findAll();
  }

  // get brand by id
  public Brand getBrandById(Long id) {
    return brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Brand not found for id:" + id));
  }

  // update brand
  public Brand updateBrand(Long id, Brand brand) {
    Brand existBrand = getBrandById(id);

    existBrand.setName(brand.getName());
    existBrand.setActive(brand.getActive());
    existBrand.setPic(brand.getPic());

    return brandRepository.save(brand);
  }

  // delete brand
  public void deleteBrand(Long id) {
    Brand brand = brandRepository.findById(id).orElseThrow(() -> new RuntimeException("Brand not found for id:" + id));
    if (brand.getPic() != null) {
      deleteFile(brand.getPic());
    }
    brandRepository.deleteById(id);
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
