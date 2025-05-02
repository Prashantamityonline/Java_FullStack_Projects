package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Testimonial;
import com.prashant.api.ecom.ducart.modal.TestimonialDTO;
import com.prashant.api.ecom.ducart.modal.TestimonialResponseDTO;
import com.prashant.api.ecom.ducart.repositories.TestimonialRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class TestimonialService {
  @Autowired
  private TestimonialRepo testimonialRepo;

  String uploadDir = FileUploadUtil.getUploadDirFor("testimonials");

  // create testimonial with image
  public TestimonialResponseDTO createTestimonial(TestimonialDTO testimonialDTO, MultipartFile file)
      throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      testimonialDTO.setPic(relativePath);
    }
    // Convert to TestimonialDTO to Testimonial entity
    Testimonial testimonial = new Testimonial();
    BeanUtils.copyProperties(testimonialDTO, testimonial);

    // save entity
    Testimonial savedTestimonial = testimonialRepo.save(testimonial);

    // Convert to entity to TestimonialResponseDTO
    TestimonialResponseDTO testimonialResponseDTO = mapToResponseDTO(savedTestimonial);
    return testimonialResponseDTO;

  }

  // Helper method to map Testimonial to TestimonialResponseDTO
  private TestimonialResponseDTO mapToResponseDTO(Testimonial testimonial) {
    TestimonialResponseDTO testimonialResponseDTO = new TestimonialResponseDTO();
    BeanUtils.copyProperties(testimonial, testimonialResponseDTO);
    return testimonialResponseDTO;

  }

  // save file Method
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

    Path filePath = Path.of(uploadDir, fileName);
    file.transferTo(filePath.toFile());

    return "/uploads/testimonials/" + fileName;
  }

  public List<TestimonialResponseDTO> getAllTestimonials() {
    return testimonialRepo.findAll().stream()
        .map(this::mapToResponseDTO)
        .collect(Collectors.toList());
  }

  // update testimonial by id
  public TestimonialResponseDTO updateTestimonial(Long id, TestimonialDTO testimonialDTO, MultipartFile file)
      throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      testimonialDTO.setPic(relativePath);
    }
    // Update the testimonial in the database
    Testimonial testimonial = testimonialRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Testimonial not found"));
    testimonialDTO.setName(testimonialDTO.getName());
    testimonialDTO.setMessage(testimonialDTO.getMessage());
    testimonialDTO.setPic(testimonialDTO.getPic());
    testimonialDTO.setActive(testimonialDTO.isActive());
    // Convert to DTO to entity
    BeanUtils.copyProperties(testimonialDTO, testimonial);
    // save entity
    Testimonial updatedTestimonial = testimonialRepo.save(testimonial);
    // Convert to entity to ResponseDTO
    TestimonialResponseDTO testimonialResponseDTO = mapToResponseDTO(updatedTestimonial);
    return testimonialResponseDTO;
  }

  // delete testimonial by id or image
  public void deleteTestimonial(Long id) throws IOException {
    Testimonial testimonial = testimonialRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Testimonial not found by id: " + id));
    String filePath = testimonial.getPic();
    if (filePath != null) {
      Path path = Path.of(uploadDir, filePath);
      if (path.toFile().exists()) {
        path.toFile().delete();
      }
    }
    testimonialRepo.delete(testimonial);
  }

}