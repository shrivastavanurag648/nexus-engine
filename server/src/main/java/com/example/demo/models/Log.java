package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    @Id
    private String id;
    private String wardenId;
    private String action;    // e.g., "ASSIGN" or "VACATE"
    private String details;   // e.g., "Student 101 moved to Room 204"
    private LocalDateTime timestamp = LocalDateTime.now();
}
