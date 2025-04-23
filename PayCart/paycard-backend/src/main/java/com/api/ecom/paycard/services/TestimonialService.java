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

import com.api.ecom.paycard.entities.Testimonial;
import com.api.ecom.paycard.model.TestimonialDTO;
import com.api.ecom.paycard.repository.TestmonialRepository;

@Service
public class TestimonialService {

  @Autowired
  private TestmonialRepository testmonialRepository;

  // Directory to store uploaded images
  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/testimonials/";

  public TestimonialService() {
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // create testimonial
  public Testimonial createTestimonial(TestimonialDTO testimonialDTO, MultipartFile file) throws IOException {
    Testimonial testimonial = new Testimonial();
    BeanUtils.copyProperties(testimonialDTO, testimonial);

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      testimonial.setPic(relativePath);
    }
    return testmonialRepository.save(testimonial);

  }

  // method to save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);

    System.out.println("Saving file to: " + filePath.toString()); // Debugging log

    Files.write(filePath, file.getBytes());
    return "/uploads/testimonials/" + fileName;
  }

  // get all Testimonial
  public List<Testimonial> getAllTestimonials() {
    return testmonialRepository.findAll();
  }

  // get testimonial by id
  public Testimonial getByIdTestimonial(Integer id) {
    return testmonialRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Testimonial Not found By id" + id));
  }

  // update testimonial
  public Testimonial updateTestimonial(Integer id, Testimonial testimonial) {
    Testimonial savedTestimonial = testmonialRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Testimonial Not found By id" + id));
    savedTestimonial.setName(testimonial.getName());
    savedTestimonial.setMessage(testimonial.getMessage());
    savedTestimonial.setPic(testimonial.getPic());
    savedTestimonial.setActive(testimonial.getActive());
    return testmonialRepository.save(savedTestimonial);

  }

  // delete Testimonial
  public Testimonial deleteTestimonial(Integer id) {
    Testimonial testimonial = testmonialRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Testimonial Not found By id" + id));
    testmonialRepository.delete(testimonial);
    return testimonial;

  }

}
