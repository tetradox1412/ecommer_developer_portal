package com.devportal.bff.controller;

import com.devportal.bff.model.SubmissionDto;
import com.devportal.bff.model.VersionInfoDto;
import com.devportal.bff.model.UserActivityEntity;
import com.devportal.bff.model.UserEntity;
import com.devportal.bff.repository.UserRepository;
import com.devportal.bff.security.JwtUser;
import com.devportal.bff.service.SubmissionService;
import com.devportal.bff.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/bff/developer")
@RequiredArgsConstructor
public class DeveloperController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final SubmissionService submissionService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal JwtUser principal) {
        log.info("Fetching profile details for user ID: {}", principal.id());
        Optional<UserEntity> userOpt = userRepository.findById(principal.id());
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName(),
                "role", user.getRole(),
                "googleLinked", user.getGoogleId() != null
            ));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal JwtUser principal, @RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");

        log.info("Updating profile details for user ID: {}, name: {}, email: {}", principal.id(), name, email);
        boolean success = userService.updateProfile(principal.id(), name, email);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Failed to update profile or email already taken"));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal JwtUser principal, @RequestBody Map<String, String> body) {
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        log.info("Attempting password change for user ID: {}", principal.id());
        boolean success = userService.changePassword(principal.id(), oldPassword, newPassword);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid current password"));
    }

    @GetMapping("/activities")
    public ResponseEntity<List<UserActivityEntity>> getActivities(@AuthenticationPrincipal JwtUser principal) {
        log.info("Fetching activities history for user ID: {}", principal.id());
        List<UserActivityEntity> activities = userService.getActivities(principal.id());
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<SubmissionDto>> getSubmissions(@AuthenticationPrincipal JwtUser principal) {
        log.info("Fetching submissions history for user ID: {}", principal.id());
        List<SubmissionDto> submissions = submissionService.getSubmissionsForDeveloper(principal.id());
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/submissions/{moduleName}/versions")
    public ResponseEntity<List<VersionInfoDto>> getModuleVersions(
            @AuthenticationPrincipal JwtUser principal,
            @PathVariable String moduleName) {
        log.info("Fetching version history for module {} (developer {})", moduleName, principal.id());
        List<VersionInfoDto> versions = submissionService.getVersionsForModule(principal.id(), moduleName);
        return ResponseEntity.ok(versions);
    }
}
