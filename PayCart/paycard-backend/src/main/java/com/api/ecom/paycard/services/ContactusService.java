package com.api.ecom.paycard.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.ecom.paycard.entities.Contactus;
import com.api.ecom.paycard.model.ContactusDTO;
import com.api.ecom.paycard.repository.ContactusRepository;

@Service
public class ContactusService {

  @Autowired
  private ContactusRepository contactusRepository;

  // create contactus
  public Contactus createContactus(ContactusDTO contactusDTO) {
    Contactus contactus = new Contactus();
    BeanUtils.copyProperties(contactusDTO, contactus);

    return contactusRepository.save(contactus);
  }

  // get all contactus
  public List<Contactus> getAllContactus() {
    return contactusRepository.findAll();
  }

  // get contactus By id
  public Contactus geContactus(Integer id) {
    return contactusRepository.findById(id).orElseThrow(() -> new RuntimeException("Contactus not find for id" + id));
  }

  // update contactus by id
  public Contactus updateContactus(Contactus contactus, Integer id) {
    Contactus savedContactus = contactusRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Contactus not found"));
    savedContactus.setName(contactus.getName());
    savedContactus.setEmail(contactus.getEmail());
    savedContactus.setPhone(contactus.getPhone());
    savedContactus.setMessage(contactus.getMessage());
    savedContactus.setDate(contactus.getDate());
    savedContactus.setActive(contactus.getActive());

    return contactusRepository.save(savedContactus);

  }

  // delete contactus by id
  public Contactus deleteContactus(Integer id) {
    Contactus contactus = contactusRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Contactus not found "));
    contactusRepository.deleteById(id);
    return contactus;

  }

}
