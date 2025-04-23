package com.api.ecom.paycard.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.Testimonial;
import com.api.ecom.paycard.model.TestimonialDTO;
import com.api.ecom.paycard.services.TestimonialService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })

@RestController
@RequestMapping("/testimonial")
public class TestimonialController {
    @Autowired
    private TestimonialService testimonialService;

    // create testimonial
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Testimonial> createTestimonial(@RequestPart("data") TestimonialDTO testimonialDTO,
            @RequestPart(value = "pic", required = false) MultipartFile file) {
        try {
            // Debugging logs
            System.out.println("Received Data: " + testimonialDTO);
            if (file != null) {
                System.out.println("Received File: " + file.getOriginalFilename());
            }
            Testimonial saveTestimonial = testimonialService.createTestimonial(testimonialDTO, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(saveTestimonial);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Testimonial> getTestimonial(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(testimonialService.getByIdTestimonial(id));
    }

    // Get all Testimonial
    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.status(HttpStatus.OK).body(testimonialService.getAllTestimonials());
    }

    // Update Testimonial
    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Integer id,
            @RequestBody Testimonial testimonial) {
        return ResponseEntity.status(HttpStatus.OK).body(testimonialService.updateTestimonial(id, testimonial));

    }

    // delete testimonial
    @PutMapping(" /{id}")
    public ResponseEntity<Testimonial> upadateTestimonial(@PathVariable Integer id,
            @RequestBody Testimonial testimonial) {
        return ResponseEntity.status(HttpStatus.OK).body(testimonialService.updateTestimonial(id, testimonial));
    }

    // delete testimonial
    @DeleteMapping("/{id}")
    public ResponseEntity<Testimonial> deleteTestimonial(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(testimonialService.deleteTestimonial(id));
    }

}
