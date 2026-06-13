package com.devportal.bff.controller;

import com.devportal.bff.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/bff/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Mock authentication — in production, validate against user store
        if ("dev@devportal.com".equals(email) && "password123".equals(password)) {
            String token = jwtUtil.generateToken("dev-001", email, "DEVELOPER_PARTNER");
            return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of("sub", "dev-001", "email", email, "role", "DEVELOPER_PARTNER")
            ));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
