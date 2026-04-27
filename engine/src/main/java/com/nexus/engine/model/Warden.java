package com.nexus.engine.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "wardens")
public class Warden {
    @Id
    private String id;
    private String wardenId; // This is their username/ID
    private String password; // We will encrypt this later
    private String sector;   // "MALE" or "FEMALE"
}