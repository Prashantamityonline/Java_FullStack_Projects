package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.Testimonial;
import com.prashant.api.ecom.ducart.modal.TestimonialDTO;
import com.prashant.api.ecom.ducart.repositories.TestimonialRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class TestimonialService {
  @Autowired
  private TestimonialRepo testimonialRepo;

  String uploadDir = FileUploadUtil.getUploadDirFor("testimonials");

  // create testimonial with image
  public Testimonial createTestimonial(TestimonialDTO testimonialDTO, MultipartFile file) throws IOException {
    // File upload logic
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      testimonialDTO.setPic(relativePath);
    }

    // Save the testimonial to the database
    Testimonial testimonial = new Testimonial();
    BeanUtils.copyProperties(testimonialDTO, testimonial);
    return testimonialRepo.save(testimonial);
  }

  // save file Method
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

    Path filePath = Path.of(uploadDir, fileName);
    file.transferTo(filePath.toFile());

    return "/uploads/testimonials/" + fileName;
  }

  // getAll testimonials
  public List<Testimonial> getAllTestimonials() {
    return testimonialRepo.findAll();
  }

  // update testimonial by id
  public Testimonial updateTestimonial(Long id, TestimonialDTO testimonialDTO, MultipartFile file) throws IOException {
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

    BeanUtils.copyProperties(testimonialDTO, testimonial);
    return testimonialRepo.save(testimonial);
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