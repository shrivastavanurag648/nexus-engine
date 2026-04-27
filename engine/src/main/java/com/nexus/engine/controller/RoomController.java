package com.nexus.engine.controller;

import com.nexus.engine.model.Room;
import com.nexus.engine.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/sector/{sector}")
    public List<Room> getRoomsBySector(@PathVariable String sector) {
        return roomRepository.findBySectorIgnoreCase(sector);
    }
    @PutMapping("/{roomId}/students")
    public Room updateRoomStudents(@PathVariable String roomId, @RequestBody List<Room.Student> students) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setStudents(students);
        room.setOccupancy(students.size());

        return roomRepository.save(room);
    }
}
