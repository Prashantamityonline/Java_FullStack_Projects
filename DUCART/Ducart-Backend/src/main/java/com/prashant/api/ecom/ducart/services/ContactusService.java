package com.prashant.api.ecom.ducart.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.Contactus;
import com.prashant.api.ecom.ducart.modal.ContactusDTO;
import com.prashant.api.ecom.ducart.modal.ContactusResponseDTO;
import com.prashant.api.ecom.ducart.repositories.ContactusRepo;

@Service
public class ContactusService {

  @Autowired
  private ContactusRepo contactusRepo;

  // save Contactus details
  public ContactusResponseDTO saveContactus(ContactusDTO contactusDTO) {
    Contactus contactus = new Contactus();
    // convert DTO to entity
    BeanUtils.copyProperties(contactusDTO, contactus);
    // save entity
    Contactus saveContactus = contactusRepo.save(contactus);
    // convert entity to ResposeDTO
    ContactusResponseDTO contactusResponseDTO = mapToResponseDTO(saveContactus);
    return contactusResponseDTO;
  }

  // Helper method map entity to ContactusResponseDTO
  ContactusResponseDTO mapToResponseDTO(Contactus contactus) {
    ContactusResponseDTO contactusResponseDTO = new ContactusResponseDTO();
    BeanUtils.copyProperties(contactus, contactusResponseDTO);
    return contactusResponseDTO;
  }

  // Get all Contactus details
  public List<ContactusResponseDTO> getAllContactus() {
    // list entities
    List<Contactus> contactus = contactusRepo.findAll();
    // Convert to entities list to ResponseDTO
    List<ContactusResponseDTO> contactusResponseDTOs = contactus.stream().map(this::mapToResponseDTO)
        .collect(Collectors.toList());
    return contactusResponseDTOs;

  }
}
