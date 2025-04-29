package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.modal.TestimonialDTO;
import com.prashant.api.ecom.ducart.modal.TestimonialResponseDTO;

import com.prashant.api.ecom.ducart.services.TestimonialService;

@RestController
@RequestMapping("/testimonial")
public class TestimonialController {
  @Autowired
  private TestimonialService testimonialService;

  // create testimonial with image
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<TestimonialResponseDTO> createTestimonial(@RequestPart("data") String jsonData,
      @RequestPart(value = "pic") MultipartFile file) {
    try {
      // Convert to JsonData to Java Object
      ObjectMapper mapper = new ObjectMapper();
      TestimonialDTO testimonialDTO = mapper.readValue(jsonData, TestimonialDTO.class);
      // call service layer
      TestimonialResponseDTO testimonialResponseDTO = testimonialService.createTestimonial(testimonialDTO, file);
      // return response
      return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // getAll testimonials
  @GetMapping
  public ResponseEntity<List<TestimonialResponseDTO>> getAllTestimonials() {
    return ResponseEntity.status(HttpStatus.OK).body(testimonialService.getAllTestimonials());
  }

  // update testimonial by id
  @PutMapping("/{id}")
  public ResponseEntity<TestimonialResponseDTO> updateTestimonial(
      @PathVariable Long id,
      @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      TestimonialDTO testimonialDTO = mapper.readValue(jsonData, TestimonialDTO.class);
      // call service layer
      TestimonialResponseDTO testimonialResponseDTO = testimonialService.updateTestimonial(id, testimonialDTO, file);
      return ResponseEntity.status(HttpStatus.OK).body(testimonialResponseDTO);
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  // delete testimonial by id with image
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteTestimonial(@PathVariable Long id) {
    try {
      testimonialService.deleteTestimonial(id);
      // Optionally, you can also delete the image file from the server if needed
      return ResponseEntity.ok("Testimonial deleted successfully");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error deleting testimonial: " + e.getMessage());
    }
  }
}
