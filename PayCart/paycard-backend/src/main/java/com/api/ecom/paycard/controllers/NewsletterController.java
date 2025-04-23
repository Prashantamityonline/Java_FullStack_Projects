package com.api.ecom.paycard.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.api.ecom.paycard.entities.Newsletter;
import com.api.ecom.paycard.model.NewsletterDTO;
import com.api.ecom.paycard.services.NewsletterService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {
    @Autowired
    private NewsletterService newsletterService;

    // GetAll Newsletters
    @GetMapping
    public ResponseEntity<List<Newsletter>> getAllNewsletters() {
        return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getAllNewsletters());
    }

    // create newsletters
    @PostMapping
    public ResponseEntity<Newsletter> createNewsletter(@RequestBody NewsletterDTO newsletterDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(newsletterService.createNewsletter(newsletterDTO));
    }

    // Get newsletter by id
    @GetMapping("/{id}")
    public ResponseEntity<Newsletter> getNewsletter(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(newsletterService.getNewsletter(id));
    }

    // update newsletter by id
    @PutMapping("/{id}")
    public ResponseEntity<Newsletter> updateNewsletter(@PathVariable Integer id, @RequestBody Newsletter newsletter) {
        return ResponseEntity.status(HttpStatus.OK).body(newsletterService.updateNewsletter(id, newsletter));
    }

    // delete newsletter by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Newsletter> deleteNewsletter(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(newsletterService.deleteNewsletter(id));

    }

}
