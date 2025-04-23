package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Maincategory;
import com.prashant.api.ecom.ducart.modal.MaincategoryDTO;
import com.prashant.api.ecom.ducart.repositories.MaincategoryRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class MaincategoryService {
     @Autowired
     private MaincategoryRepo maincategoryRepo;

     // File upload directory
     String uploadDir = FileUploadUtil.getUploadDirFor("maincategories");

     // Create Maincategory
     public Maincategory createMaincategory(MaincategoryDTO maincategoryDTO, MultipartFile file) throws IOException {
          Maincategory maincategory = new Maincategory();
          BeanUtils.copyProperties(maincategoryDTO, maincategory);

          // File upload Logic
          if (file != null && !file.isEmpty()) {
               String relativePath = saveFile(file);
               maincategoryDTO.setPic(relativePath);

          }
          return maincategoryRepo.save(maincategory);

     }

     // save file Method
     private String saveFile(MultipartFile file) throws IOException {
          String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
          Path filePath = Paths.get(uploadDir, fileName);
          Files.write(filePath, file.getBytes());
          return "/uploads/maincategories/" + fileName;
     }

     // getAll maincategories
     public List<Maincategory> getAllMaincategories() {
          return maincategoryRepo.findAll();
     }

     // update maincategory by id
     public Maincategory updateMaincategoryById(Long id, MaincategoryDTO maincategoryDTO, MultipartFile file)
               throws IOException {

          // File upload Logic
          if (file != null && !file.isEmpty()) {
               String relativePath = saveFile(file);
               maincategoryDTO.setPic(relativePath);
          }
          // Find existing maincategory by ID and update its properties
          Maincategory existingMaincategory = maincategoryRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Maincategory not found"));
          maincategoryDTO.setName(maincategoryDTO.getName());
          maincategoryDTO.setPic(maincategoryDTO.getPic());
          maincategoryDTO.setActive(maincategoryDTO.isActive());
          if (existingMaincategory != null) {
               BeanUtils.copyProperties(maincategoryDTO, existingMaincategory, "id");
               return maincategoryRepo.save(existingMaincategory);
          } else {
               throw new RuntimeException("Maincategory not found");
          }

     }

     // delete maincategory by id
     public void deleteMaincategoryById(Long id) {
          maincategoryRepo.deleteById(id);
     }

}
