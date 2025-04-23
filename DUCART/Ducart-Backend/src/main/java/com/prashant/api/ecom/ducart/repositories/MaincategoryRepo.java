package com.prashant.api.ecom.ducart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prashant.api.ecom.ducart.entities.Maincategory;

@Repository
public interface MaincategoryRepo extends JpaRepository<Maincategory, Long>{
//find() saare record laane ke liye, findByid - Ek record laane liye
//save() save ya update karne ke liye,
//deleteById() - Record delete karne ke liye , count() - kitne record hai
	
//	List<Maincategory>findByActiveTrue();
}
