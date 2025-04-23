package com.api.ecom.paycard.globle_config_handle;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.micrometer.common.lang.NonNull;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Bean
  public CorsFilter corsFilter() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();

    // Allow requests from the React frontend
    corsConfiguration.addAllowedOriginPattern("http://localhost:3000");

    // Allow HTTP methods
    corsConfiguration.addAllowedMethod("GET");
    corsConfiguration.addAllowedMethod("POST");
    corsConfiguration.addAllowedMethod("PUT");
    corsConfiguration.addAllowedMethod("DELETE");

    // Allow all headers
    corsConfiguration.addAllowedHeader("*");

    // Allow credentials
    corsConfiguration.setAllowCredentials(true);

    // Apply configuration to all endpoints
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);

    return new CorsFilter(source);
  }

  @Override
  public void addResourceHandlers(@SuppressWarnings("null") @NonNull ResourceHandlerRegistry registry) {
    Path uploadDir = Paths.get("uploads");
    String uploadPath = "file:" + uploadDir.toAbsolutePath().toString() + "/";

    registry.addResourceHandler("/uploads/**")
        .addResourceLocations(uploadPath)
        .setCachePeriod(3600); // Optional: Set cache time in seconds
  }

}
