package com.example.demo.controllers;

import com.example.demo.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    public record LoginRequest(String username, String password) {
    }

    public record TokenResponse(String token) {
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("Login Attempt Received for: " + request.username());
        // Hardcoded bypass for testing
        if ("warden".equalsIgnoreCase(request.username()) && "admin123".equals(request.password())) {
            // Generate the token using your JwtUtil
            String token = jwtUtil.generateToken(request.username());
            return ResponseEntity.ok(new TokenResponse(token));
        }

        // If it doesn't match, return 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
