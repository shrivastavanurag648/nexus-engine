package com.nexus.engine.controller;

import com.nexus.engine.model.Warden;
import com.nexus.engine.service.WardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Crucial: Allows your Vite/React app to connect!
public class WardenController {

    @Autowired
    private WardenService wardenService;

    // 1. A simple test endpoint to check if the server is alive
    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("NEXUS Auth Server: ONLINE");
    }

    // 2. Endpoint to create a new Warden
    @PostMapping("/register")
    public ResponseEntity<Warden> register(@RequestBody Warden warden) {
        return ResponseEntity.ok(wardenService.registerWarden(warden));
    }

    // 3. Endpoint to log in
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String id = credentials.get("wardenId");
        String pass = credentials.get("password");

        // Look up the warden
        Optional<Warden> wardenOpt = wardenService.login(id, pass);

        // If found and password matches, return the Warden object (Status 200)
        if (wardenOpt.isPresent()) {
            return ResponseEntity.ok(wardenOpt.get());
        }
        // If not found or bad password, return an error message (Status 401)
        else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}