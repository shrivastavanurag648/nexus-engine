package com.nexus.engine.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "rooms")
public class Room {

    @Id
    private String id; // e.g., "101", "204"
    private String wing; // e.g., "A", "B"
    private String sector; // "male" or "female"
    private double xRatio; // For the frontend tactical grid
    private double yRatio;
    private int capacity = 4;
    private int occupancy = 0;
    private String clearance = "C1";

    // This embeds the students directly inside the room document!
    private List<Student> students = new ArrayList<>();

    @Data
    public static class Student {
        private String id;
        private String name;

        // Constructor for easy assignment
        public Student(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}