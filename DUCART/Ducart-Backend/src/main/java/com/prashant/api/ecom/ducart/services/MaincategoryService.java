package com.prashant.api.ecom.ducart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Maincategory;
import com.prashant.api.ecom.ducart.modal.MainResponseDTO;
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
     public MainResponseDTO createMaincategory(MaincategoryDTO maincategoryDTO, MultipartFile file) throws IOException {
          // File upload Logic
          if (file != null && !file.isEmpty()) {
               String relativePath = saveFile(file);
               maincategoryDTO.setPic(relativePath);
          }
          Maincategory maincategory = new Maincategory();
          // convert DTO to entity
          BeanUtils.copyProperties(maincategoryDTO, maincategory);
          // save entity
          Maincategory savedMaincategory = maincategoryRepo.save(maincategory);
          // convert entity to ResponseDTO
          MainResponseDTO mainResponseDTO = mapToResponseDTO(savedMaincategory);

          return mainResponseDTO;

     }

     // Heleper method map to maincategory entity to ResponseDTO
     private MainResponseDTO mapToResponseDTO(Maincategory maincategory) {
          MainResponseDTO mainResponseDTO = new MainResponseDTO();
          BeanUtils.copyProperties(maincategory, mainResponseDTO);
          return mainResponseDTO;
     }

     // save file Method
     private String saveFile(MultipartFile file) throws IOException {
          String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
          Path filePath = Path.of(uploadDir, fileName);
          Files.write(filePath, file.getBytes());
          return "/uploads/maincategories/" + fileName;
     }

     // getAll maincategories
     public List<MainResponseDTO> getAllMaincategories() {
          List<Maincategory> maincategories = maincategoryRepo.findAll();
          // convert entity list in to ResponseDTO list
          List<MainResponseDTO> mainResponseDTOs = maincategories.stream().map(this::mapToResponseDTO).toList();
          return mainResponseDTOs;
     }

     // update maincategory by id
     public MainResponseDTO updateMaincategoryById(Long id, MaincategoryDTO maincategoryDTO, MultipartFile file)
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
               // Convert to maincategoryDTO to entity
               BeanUtils.copyProperties(maincategoryDTO, existingMaincategory);

               // save entity
               Maincategory updatedMaincategory = maincategoryRepo.save(existingMaincategory);

               // Convert to entity to ResponseDTO
               MainResponseDTO mainResponseDTO = mapToResponseDTO(updatedMaincategory);
               return mainResponseDTO;
          } else {
               throw new RuntimeException("Maincategory not found");
          }

     }

     // delete Maincategory
     public void deleteMaincategory(Long id) {
          Maincategory maincategory = maincategoryRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("maincategory not found for id:" + id));
          if (maincategory.getPic() != null) {
               deleteFile(maincategory.getPic());
          }
          maincategoryRepo.deleteById(id);
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
