package org.akhil.assignmentauditor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://localhost:5173", "http://51.20.78.25:5173") // Allow only React app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Allow credentials
    }
}
