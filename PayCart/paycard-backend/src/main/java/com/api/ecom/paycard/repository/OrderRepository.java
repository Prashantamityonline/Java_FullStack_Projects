package com.api.ecom.paycard.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.ecom.paycard.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
  List<Order> findByUserId(Integer userid);

}
