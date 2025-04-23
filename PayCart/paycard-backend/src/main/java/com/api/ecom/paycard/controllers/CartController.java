// package com.api.ecom.paycard.controllers;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestMethod;

// import org.springframework.web.bind.annotation.RestController;

// import com.api.ecom.paycard.entities.CartItem;
// import com.api.ecom.paycard.entities.Order;
// import com.api.ecom.paycard.model.CartItemDTO;
// import com.api.ecom.paycard.services.CartService;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;

// @CrossOrigin(origins = "http://localhost:3000", methods = {
// RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
// RequestMethod.DELETE })

// @RestController
// @RequestMapping("/cart")
// public class CartController {
// @Autowired
// private CartService cartService;

// // create cart
// @PostMapping
// public ResponseEntity<CartItem> addCart(CartItemDTO cartItemDTO) {
// CartItem savedCartItem = cartService.addCartItem(cartItemDTO);
// return ResponseEntity.status(HttpStatus.CREATED).body((savedCartItem));
// }

// // getAll carts
// @GetMapping
// public ResponseEntity<List<CartItem>> getAllCartItems() {
// return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartItems());
// }

// // get cart By id
// @GetMapping("/{id}")
// public ResponseEntity<CartItem> getCart(@PathVariable Integer id) {
// return
// ResponseEntity.status(HttpStatus.OK).body(cartService.getCartItem(id));
// }

// // update cart
// @PutMapping("/{id}")
// public ResponseEntity<CartItem> updateCart(@PathVariable Integer id,
// @RequestBody CartItem cartItem) {
// return
// ResponseEntity.status(HttpStatus.OK).body(cartService.updateCartItem(id,
// cartItem));
// }

// // delete cart
// public ResponseEntity<CartItem> deleteCart(@PathVariable Integer id) {
// return
// ResponseEntity.status(HttpStatus.NO_CONTENT).body(cartService.deleteCartItem(id));
// }

// @PostMapping("/place-order")
// public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
// return
// ResponseEntity.status(HttpStatus.CREATED).body(cartService.placeOrder(order));
// }

// }
