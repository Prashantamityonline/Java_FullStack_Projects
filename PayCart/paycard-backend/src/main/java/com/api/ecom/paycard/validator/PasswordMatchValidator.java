// package com.api.ecom.paycard.validator;

// import com.api.ecom.paycard.model.UserDTO;
// import com.api.ecom.paycard.validator.payload.PasswordMatch;

// import jakarta.validation.ConstraintValidator;
// import jakarta.validation.ConstraintValidatorContext;

// public class PasswordMatchValidator implements
// ConstraintValidator<PasswordMatch, UserDTO> {
// @Override
// public boolean isValid(UserDTO userDTO, ConstraintValidatorContext context) {
// if (userDTO.getPassword() == null || userDTO.getCpassword() == null) {
// return false;
// }
// return userDTO.getPassword().equals(userDTO.getCpassword());
// }
// }
