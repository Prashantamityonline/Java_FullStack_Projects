// package com.api.ecom.paycard.validator.payload;

// import java.lang.annotation.ElementType;
// import java.lang.annotation.Retention;
// import java.lang.annotation.RetentionPolicy;
// import java.lang.annotation.Target;

// import com.api.ecom.paycard.validator.PasswordMatchValidator;

// import jakarta.validation.Constraint;
// import jakarta.validation.Payload;

// @Constraint(validatedBy = PasswordMatchValidator.class)
// @Target(ElementType.TYPE)
// @Retention(RetentionPolicy.RUNTIME)
// public @interface PasswordMatch {
// String message() default "Passwords do not match";

// Class<?>[] groups() default {};

// Class<? extends Payload>[] payload() default {};
// }