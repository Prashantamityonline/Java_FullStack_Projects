package com.api.ecom.paycard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.ecom.paycard.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

  Boolean existsByName(String Name);
}
