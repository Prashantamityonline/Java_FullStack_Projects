package com.api.ecom.paycard.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.ecom.paycard.entities.Newsletter;
import com.api.ecom.paycard.model.NewsletterDTO;
import com.api.ecom.paycard.repository.NewsletterRepository;

@Service
public class NewsletterService {

  @Autowired
  private NewsletterRepository newsletterRepository;

  // create newsletter
  public Newsletter createNewsletter(NewsletterDTO newsletterDTO) {
    Newsletter newsletter = new Newsletter();
    BeanUtils.copyProperties(newsletterDTO, newsletter);
    return newsletterRepository.save(newsletter);
  }

  // get All newsletter
  public List<Newsletter> getAllNewsletters() {
    return newsletterRepository.findAll();
  }

  // get newsletter by id
  public Newsletter getNewsletter(Integer id) {
    return newsletterRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Newsletter is not found By id" + id));
  }

  // update newsletter by id
  public Newsletter updateNewsletter(Integer id, Newsletter newsletter) {
    Newsletter savedNewsletter = newsletterRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Newsletter is not update by  this id" + id));
    savedNewsletter.setEmail(newsletter.getEmail());
    savedNewsletter.setActive(newsletter.isActive());
    return newsletterRepository.save(savedNewsletter);
  }

  // delete newsletters by id
  public Newsletter deleteNewsletter(Integer id) {
    Newsletter newsletter = newsletterRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Newsletter not found by id " + id));
    newsletterRepository.deleteById(id);
    return newsletter;
  }

}
