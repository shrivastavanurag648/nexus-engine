package com.example.demo.controllers;

import com.example.demo.models.Log;
import com.example.demo.models.Room;
import com.example.demo.models.Student;
import com.example.demo.repositories.LogRepository;
import com.example.demo.repositories.RoomRepository;
import com.example.demo.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AllocationController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LogRepository logRepository;

    @GetMapping("/rooms/sector/{sector}")
    public ResponseEntity<List<Room>> getRoomsBySector(@PathVariable String sector) {
        return ResponseEntity.ok(roomRepository.findBySector(sector.toLowerCase()));
    }

    @PutMapping("/rooms/{roomId}/students")
    public ResponseEntity<?> updateRoomStudents(@PathVariable String roomId, @RequestBody List<Room.StudentData> students) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Room not found");
        }

        Room room = roomOpt.get();
        int oldOccupancy = room.getOccupancy();
        int newOccupancy = students.size();

        room.setStudents(students);
        room.setOccupancy(newOccupancy);
        room.setStatus(newOccupancy >= room.getCapacity() ? "Full" : newOccupancy == 0 ? "Vacant" : "Partial");

        Room savedRoom = roomRepository.save(room);

        // Logging the action
        Log log = new Log();
        log.setAction(newOccupancy > oldOccupancy ? "ASSIGN" : "VACATE");
        log.setDetails("Room " + room.getId() + " updated. Students count: " + newOccupancy);
        // Using a default wardenId for now as it's not passed from frontend yet
        log.setWardenId("WARDEN_01");
        logRepository.save(log);

        return ResponseEntity.ok(savedRoom);
    }

    public record AllocationRequest(String name, int year, String department, String roomNumber) {}

    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getRooms() {
        return ResponseEntity.ok(roomRepository.findAll());
    }
}
