package com.prashant.api.ecom.ducart.services;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.Newsletter;
import com.prashant.api.ecom.ducart.modal.NewsletterDTO;
import com.prashant.api.ecom.ducart.modal.NewsletterResponseDTO;
import com.prashant.api.ecom.ducart.repositories.NewsletterRepo;

@Service
public class NewsletterService {
  @Autowired
  private NewsletterRepo newsletterRepo;

  // Method to save newsletter subscription
  public NewsletterResponseDTO saveNewsletter(NewsletterDTO newsletterDTO) {
    // Create a new Newsletter entity and copy properties from DTO
    Newsletter newsletter = new Newsletter();
    // convert DTO to entity
    BeanUtils.copyProperties(newsletterDTO, newsletter);
    // save entity
    Newsletter savedNewsletter = newsletterRepo.save(newsletter);

    // convert Entity to ResponseDTO
    NewsletterResponseDTO newsletterResponseDTO = mapToResponseDTO(savedNewsletter);
    return newsletterResponseDTO;

  }

  // Helper method map entiy to ResponseDTO
  private NewsletterResponseDTO mapToResponseDTO(Newsletter newsletter) {
    NewsletterResponseDTO newsletterResponseDTO = new NewsletterResponseDTO();
    BeanUtils.copyProperties(newsletter, newsletterResponseDTO);
    return newsletterResponseDTO;
  }

  // Get all subscriptions
  public List<NewsletterResponseDTO> getAllNewsLetter() {
    // entity list in ResponseNewsletterDto
    List<Newsletter> allNewslatters = newsletterRepo.findAll();
    List<NewsletterResponseDTO> allNewslattersDTO = allNewslatters.stream().map(this::mapToResponseDTO)
        .collect(Collectors.toList());
    return allNewslattersDTO;
  }
}
