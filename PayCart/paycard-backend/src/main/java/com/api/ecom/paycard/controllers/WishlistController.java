package com.api.ecom.paycard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.api.ecom.paycard.entities.WishList;
import com.api.ecom.paycard.model.WishListDTO;

import com.api.ecom.paycard.services.WishlistService;

import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RestController
@RequestMapping("/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    // create wishlist
    @PostMapping
    public ResponseEntity<WishList> createWishList(@RequestBody WishListDTO wishList) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistService.createWishList(wishList));
    }

    // get All wishlist
    @GetMapping
    public ResponseEntity<List<WishList>> getAllWishList() {
        return ResponseEntity.status(HttpStatus.OK).body(wishlistService.getAllWishList());
    }

    // get wishlist By id
    @GetMapping("/{id}")
    public ResponseEntity<WishList> getWishList(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(wishlistService.getWishList(id));
    }

    // delete wishlist By id
    @DeleteMapping("/{id}")
    public ResponseEntity<WishList> deleteWishlist(@PathVariable Integer id) {
        wishlistService.deleteWishList(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
