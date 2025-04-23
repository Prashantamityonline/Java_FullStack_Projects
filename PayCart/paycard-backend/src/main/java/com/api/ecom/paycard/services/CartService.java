// package com.api.ecom.paycard.services;

// import java.util.List;

// import org.springframework.beans.BeanUtils;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.api.ecom.paycard.entities.CartItem;
// import com.api.ecom.paycard.entities.Order;
// import com.api.ecom.paycard.model.CartItemDTO;
// import com.api.ecom.paycard.repository.CartItemRepository;
// import com.api.ecom.paycard.repository.OrderRepository;

// @Service
// public class CartService {

// @Autowired
// private CartItemRepository cartItemRepository;

// @Autowired
// private OrderRepository orderRepository;

// // get all cartItems
// public List<CartItem> getCartItems() {
// return cartItemRepository.findAll();
// }

// // add cart
// public CartItem addCartItem(CartItemDTO cartItemDTO) {
// CartItem cartItem = new CartItem();
// BeanUtils.copyProperties(cartItemDTO, cartItem);
// return cartItemRepository.save(cartItem);
// }

// // get cart by id
// public CartItem getCartItem(Integer id) {
// return cartItemRepository.findById(id).orElseThrow(() -> new
// RuntimeException("CartItem not found By id :" + id));
// }

// // delete cart
// public CartItem deleteCartItem(Integer id) {
// CartItem cartItem = cartItemRepository.findById(id)
// .orElseThrow(() -> new RuntimeException("CartItem not Found by id:" + id));
// if (cartItem != null) {
// cartItemRepository.deleteById(id);
// }
// return cartItem;
// }

// // update cart
// public CartItem updateCartItem(Integer id, CartItem cartItem) {
// CartItem savedCartItem = cartItemRepository.findById(id)
// .orElseThrow(() -> new RuntimeException("wishList Not found By id" + id));
// savedCartItem.setUserId(cartItem.getUserId());
// savedCartItem.setProductId(cartItem.getProductId());
// return cartItemRepository.save(savedCartItem);
// }

// public Order placeOrder(Order order) {

// // Delete all cart items for the user
// List<CartItem> userCart =
// cartItemRepository.findByUserId(order.getUserId().longValue());
// cartItemRepository.deleteAll(userCart);

// return orderRepository.save(order);
// }

// }
