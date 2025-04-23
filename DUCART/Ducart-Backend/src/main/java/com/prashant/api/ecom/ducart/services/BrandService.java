package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.nio.file.Path;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Brand;
import com.prashant.api.ecom.ducart.modal.BrandDTO;
import com.prashant.api.ecom.ducart.repositories.BrandRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class BrandService {
  @Autowired
  private BrandRepo brandRepo;

  // file upload directory
  String uploadDir = FileUploadUtil.getUploadDirFor("brands");

  // create brand with image
  public Brand createBrand(BrandDTO brandDTO, MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brandDTO.setPic(relativePath);
    }

    // Save the brand to the database
    Brand brand = new Brand();
    BeanUtils.copyProperties(brandDTO, brand);
    return brandRepo.save(brand);

  }

  // save file Method
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadDir, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/brands/" + fileName;
  }

  // getAll brands
  public List<Brand> getAllBrands() {
    return brandRepo.findAll();
  }

  // update brand by id
  public Brand updateBrandById(Long id, BrandDTO brandDTO, MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brandDTO.setPic(relativePath);
    }

    // Update the brand in the database
    Brand brand = brandRepo.findById(id).orElseThrow(() -> new RuntimeException("Brand not found"));
    brandDTO.setName(brandDTO.getName());
    brandDTO.setPic(brandDTO.getPic());
    brandDTO.setActive(brandDTO.isActive());
    // Copy properties from DTO to entity
    BeanUtils.copyProperties(brandDTO, brand);
    return brandRepo.save(brand);
  }

  // delete brand by id
  public void deleteBrandById(Long id) {
    Brand brand = brandRepo.findById(id).orElseThrow(() -> new RuntimeException("Brand not found"));
    brandRepo.delete(brand);
  }
}