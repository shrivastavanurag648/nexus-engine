package com.example.demo.config;

import com.example.demo.models.Room;
import com.example.demo.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roomRepository.count() == 0) {
            List<Room> rooms = Arrays.asList(
                    new Room(null, "101", "A", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "102", "A", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "103", "A", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "201", "B", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "202", "B", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "203", "B", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "301", "C", "female", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "302", "C", "female", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "303", "C", "female", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Maintenance"),
                    new Room(null, "401", "D", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "402", "D", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available"),
                    new Room(null, "403", "D", "male", 0.0, 0.0, "C1", 4, 0, new ArrayList<>(), "Available")
            );
            roomRepository.saveAll(rooms);
        }
    }
}
