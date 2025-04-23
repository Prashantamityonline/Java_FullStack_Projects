package com.prashant.api.ecom.ducart.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.api.ecom.ducart.entities.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Long> {
  // Custom query methods can be defined here if needed
  // For example, find by name or active status
  List<Brand> findByName(String name);

  List<Brand> findByActive(boolean active);

}