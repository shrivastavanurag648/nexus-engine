package com.nexus.engine;

import com.nexus.engine.model.Room;
import com.nexus.engine.model.Warden;
import com.nexus.engine.repository.RoomRepository;
import com.nexus.engine.repository.WardenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class EngineApplication {

	public static void main(String[] args) {
		SpringApplication.run(EngineApplication.class, args);
	}

	// ==========================================
	// THE VAULT: SECURITY & CORS CONFIGURATION
	// ==========================================
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> auth
						// This line opens EVERYTHING starting with /api/
						.requestMatchers("/api/**").permitAll()
						.anyRequest().permitAll() // Temporarily allow everything to bypass the "Denied" error
				);
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	// ==========================================
	// THE FORGE: TACTICAL GRID INITIALIZER
	// ==========================================
	@Bean
	public CommandLineRunner loadData(WardenRepository wardenRepository, RoomRepository roomRepository) {
		return args -> {
			System.out.println("==================================================");
			System.out.println("SYSTEM ALERT: INITIATING SLEDGEHAMMER PROTOCOL...");

			// 1. Seed the Warden
			if (wardenRepository.findByWardenId("WDN-Alpha").isEmpty()) {
				Warden admin = new Warden();
				admin.setWardenId("WDN-Alpha");
				admin.setPassword("nexus2026");
				admin.setSector("male");
				wardenRepository.save(admin);
				System.out.println("SYSTEM ALERT: Alpha Warden created!");
			}

			// 2. Seed the Rooms
			if (roomRepository.count() == 0) {
				System.out.println("SYSTEM ALERT: Initializing Tactical Grid into MongoDB...");
				class WingSetup {
					String id; int prefix; String sector; double row;
					WingSetup(String i, int p, String s, double r) { id=i; prefix=p; sector=s; row=r; }
				}
				List<WingSetup> wings = Arrays.asList(
						new WingSetup("A", 1, "male", 1.5),
						new WingSetup("B", 2, "male", 4.5),
						new WingSetup("C", 3, "female", 1.5),
						new WingSetup("D", 4, "female", 4.5)
				);
				for (WingSetup wing : wings) {
					for (int i = 1; i <= 6; i++) {
						Room room = new Room();
						room.setId(wing.prefix + "0" + i);
						room.setWing(wing.id);
						room.setSector(wing.sector);
						room.setXRatio((i <= 3 ? i + 1 : i + 3) / 10.0);
						room.setYRatio(wing.row / 6.0);
						roomRepository.save(room);
					}
				}
				System.out.println("SYSTEM ALERT: 24 Rooms perfectly secured!");
			} else {
				System.out.println("SYSTEM ALERT: Tactical Grid bypassed. Rooms already detected: " + roomRepository.count());
			}
			System.out.println("==================================================");
		};
	}
}