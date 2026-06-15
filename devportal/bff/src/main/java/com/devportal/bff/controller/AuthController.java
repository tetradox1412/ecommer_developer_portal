package com.devportal.bff.controller;

import com.devportal.bff.model.UserEntity;
import com.devportal.bff.security.JwtUtil;
import com.devportal.bff.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/bff/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        log.info("Attempting DB credential authentication for email: {}", email);
        Optional<UserEntity> userOpt = userService.authenticate(email, password);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());
            return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of("sub", user.getName(), "email", user.getEmail(), "role", user.getRole())
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }

    @PostMapping("/google-login")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String name = request.get("name");
        String role = request.get("role");

        log.info("Processing Google OAuth login request for email: {}, name: {}", email, name);
        UserEntity user = userService.googleLogin(email, name, role);
        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(Map.of(
            "token", token,
            "user", Map.of("sub", user.getName(), "email", user.getEmail(), "role", user.getRole())
        ));
    }
}
