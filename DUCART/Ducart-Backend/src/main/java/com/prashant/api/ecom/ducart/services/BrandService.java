package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import java.util.List;
import java.util.stream.Collectors;
import java.nio.file.Path;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Brand;
import com.prashant.api.ecom.ducart.modal.BrandDTO;
import com.prashant.api.ecom.ducart.modal.BrandResponseDTO;
import com.prashant.api.ecom.ducart.repositories.BrandRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class BrandService {
  @Autowired
  private BrandRepo brandRepo;

  // file upload directory
  String uploadDir = FileUploadUtil.getUploadDirFor("brands");

  // create brand with image
  public BrandResponseDTO createBrand(BrandDTO brandDTO, MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brandDTO.setPic(relativePath);
    }

    // Convert BrandDTO to Entity
    Brand brand = new Brand();
    BeanUtils.copyProperties(brandDTO, brand);

    // save Entity
    Brand saveBrand = brandRepo.save(brand);
    // Convert Entity to ResponseDTO
    BrandResponseDTO brandResponseDTO = mapTOResponseDTO(saveBrand);

    return brandResponseDTO;

  }

  // Helper Method to map brand to brandResponseDTO
  private BrandResponseDTO mapTOResponseDTO(Brand brand) {
    BrandResponseDTO brandResponseDTO = new BrandResponseDTO();
    BeanUtils.copyProperties(brand, brandResponseDTO);
    return brandResponseDTO;
  }

  // save file Method
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Path.of(uploadDir, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/brands/" + fileName;
  }

  // getAll brands
  public List<BrandResponseDTO> getAllBrands() {
    // find brands by entity
    List<Brand> brands = brandRepo.findAll();
    // Convert entity list to Response List
    List<BrandResponseDTO> brandResponseDTOs = brands.stream().map(this::mapTOResponseDTO).collect(Collectors.toList());
    return brandResponseDTOs;

  }

  // update brand by id
  public BrandResponseDTO updateBrandById(Long id, BrandDTO brandDTO, MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      brandDTO.setPic(relativePath);
    }

    // Update the brand in the database
    Brand existbrand = brandRepo.findById(id).orElseThrow(() -> new RuntimeException("Brand not found"));
    brandDTO.setName(brandDTO.getName());
    brandDTO.setPic(brandDTO.getPic());
    brandDTO.setActive(brandDTO.isActive());
    // Copy properties from DTO to entity
    BeanUtils.copyProperties(brandDTO, existbrand);
    // save entity
    Brand updatedBrand = brandRepo.save(existbrand);
    // Convert entity to ResponseDTO
    BrandResponseDTO brandResponseDTO = mapTOResponseDTO(updatedBrand);

    return brandResponseDTO;
  }

  // delete brand
  public void deleteBrand(Long id) {
    Brand brand = brandRepo.findById(id).orElseThrow(() -> new RuntimeException("Brand not found for id:" + id));
    if (brand.getPic() != null) {
      deleteFile(brand.getPic());
    }
    brandRepo.deleteById(id);
  }

  // Helper method to delete a file by its path
  private void deleteFile(String filePath) {
    try {
      Path path = Path.of(uploadDir, new File(filePath).getName());
      Files.deleteIfExists(path);
    } catch (IOException e) {
      System.err.println("Error deleting file: " + filePath + " - " + e.getMessage());
    }
  }
}