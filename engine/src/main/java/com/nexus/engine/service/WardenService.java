package com.nexus.engine.service;

import com.nexus.engine.model.Warden;
import com.nexus.engine.repository.WardenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WardenService {

    @Autowired
    private WardenRepository wardenRepository;

    // Logic to save a new Warden to MongoDB
    public Warden registerWarden(Warden warden) {
        // Note: We will add password encryption (Bcrypt) here later!
        return wardenRepository.save(warden);
    }

    // Logic to verify login credentials
    public Optional<Warden> login(String wardenId, String password) {
        return wardenRepository.findByWardenId(wardenId)
                .filter(w -> w.getPassword().equals(password));
    }
}