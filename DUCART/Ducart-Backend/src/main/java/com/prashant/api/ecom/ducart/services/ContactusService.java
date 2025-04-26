package com.prashant.api.ecom.ducart.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.Contactus;
import com.prashant.api.ecom.ducart.modal.ContactusDTO;
import com.prashant.api.ecom.ducart.repositories.ContactusRepo;

@Service
public class ContactusService {

  @Autowired
  private ContactusRepo contactusRepo;

  // save Contactus details
  public Contactus saveContactus(ContactusDTO contactusDTO) {
    Contactus contactus = new Contactus();
    BeanUtils.copyProperties(contactusDTO, contactus);
    return contactusRepo.save(contactus);
  }

  // Get all Contactus details
  public List<Contactus> getAllContactus() {
    return contactusRepo.findAll();
  }
}
