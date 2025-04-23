package com.api.ecom.paycard.model;

import jakarta.validation.constraints.*;

public class UserDTO {
  private Long userid;

  @NotEmpty(message = "Name is mandatory")
  private String name;

  @NotEmpty(message = "Username is mandatory")
  private String username;

  @NotBlank(message = "Email is mandatory")
  @Email(message = "Invalid email format")
  private String email;

  @NotBlank(message = "Phone number is mandatory")
  @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
  private String phone;

  @NotBlank(message = "Password is mandatory")
  @Size(min = 8, max = 10, message = "Password must be between 6 and 10 characters")
  private String password;
  private String address;
  private String city;
  private String state;
  private Integer pin;
  private String pic;
  private String role;

  public Long getId() {
    return userid;
  }

  public void setId(Long userid) {
    this.userid = userid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public Integer getPin() {
    return pin;
  }

  public void setPin(Integer pin) {
    this.pin = pin;
  }

  public String getPic() {
    return pic;
  }

  public void setPic(String pic) {
    this.pic = pic;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "UserDTO [name=" + name + ", username=" + username + ", email=" + email + ", phone=" + phone + ", password="
        + password + ", address=" + address + ", city=" + city + ", state=" + state + ", pin=" + pin + ", pic=" + pic
        + ", role=" + role + "]";
  }

}
