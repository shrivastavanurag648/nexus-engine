package com.example.demo.repositories;

import com.example.demo.models.Log;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LogRepository extends MongoRepository<Log, String> {
    List<Log> findByWardenIdOrderByTimestampDesc(String wardenId);
}
