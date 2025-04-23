package com.api.ecom.paycard.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.ecom.paycard.entities.WishList;
import com.api.ecom.paycard.model.WishListDTO;
import com.api.ecom.paycard.repository.WishlistRepository;

@Service
public class WishlistService {

  @Autowired
  private WishlistRepository wishlistRepository;

  // create wishlist
  public WishList createWishList(WishListDTO wishListDTO) {
    WishList wishList = new WishList();
    BeanUtils.copyProperties(wishListDTO, wishList);
    return wishlistRepository.save(wishList);

  }

  // get all wishlist
  public List<WishList> getAllWishList() {
    return wishlistRepository.findAll();
  }

  // get wishList By id
  public WishList getWishList(Integer id) {
    return wishlistRepository.findById(id).orElseThrow(() -> new RuntimeException("wishlist Not found by id" + id));
  }

  // update wishlist
  public WishList updateWishList(Integer id, WishList wishList) {
    WishList savedWishList = wishlistRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("wishList Not found By id" + id));
    savedWishList.setUserId(wishList.getUserId());
    savedWishList.setProductId(wishList.getProductId());
    return wishlistRepository.save(savedWishList);
  }

  // delete Wishlist
  public WishList deleteWishList(Integer id) {
    WishList wishList = wishlistRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("wishList Not found By id" + id));
    wishlistRepository.delete(wishList);
    return wishList;
  }
}
