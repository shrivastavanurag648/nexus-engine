package com.nexus.engine.repository;

import com.nexus.engine.model.Warden;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface WardenRepository extends MongoRepository<Warden, String> {
    // This magic method lets us find a Warden by their custom ID
    Optional<Warden> findByWardenId(String wardenId);
}