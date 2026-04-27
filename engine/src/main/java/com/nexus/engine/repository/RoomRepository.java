package com.nexus.engine.repository;

import com.nexus.engine.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {
    // This magic method automatically fetches rooms based on the sector!
    List<Room> findBySectorIgnoreCase(String sector);
}