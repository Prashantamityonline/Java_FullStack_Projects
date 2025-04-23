package com.api.ecom.paycard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.ecom.paycard.entities.CartItem;
// import com.api.ecom.paycard.entities.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
  List<CartItem> findByUserId(Long userId);

  // List<Product> findByProductId(Integer productId);

}
