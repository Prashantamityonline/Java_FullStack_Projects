package com.prashant.api.ecom.ducart.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.Newsletter;
import com.prashant.api.ecom.ducart.modal.NewsletterDTO;
import com.prashant.api.ecom.ducart.repositories.NewsletterRepo;

@Service
public class NewsletterService {
  @Autowired
  private NewsletterRepo newsletterRepo;

  // Method to save newsletter subscription
  public Newsletter saveNewsletter(NewsletterDTO newsletterDTO) {
    // Create a new Newsletter entity and copy properties from DTO
    Newsletter newsletter = new Newsletter();
    newsletterDTO.setEmail(newsletterDTO.getEmail());
    newsletterDTO.setActive(newsletterDTO.isActive());
    BeanUtils.copyProperties(newsletterDTO, newsletter);
    return newsletterRepo.save(newsletter);

  }
}
