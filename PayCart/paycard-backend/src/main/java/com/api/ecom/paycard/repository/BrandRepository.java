package com.api.ecom.paycard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.ecom.paycard.entities.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
  boolean existsByName(String name);

  boolean existsByPic(String pic);
}
