package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id;
    private String roomNumber;
    private String wing;
    private String sector; // 'male' or 'female'
    private double xRatio;
    private double yRatio;
    private String clearance = "C1";
    private int capacity = 4;
    private int occupancy = 0;
    private List<StudentData> students = new ArrayList<>();
    private String status = "Available";

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StudentData {
        private String id;
        private String name;
    }
}
