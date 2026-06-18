package com.devportal.bff.service;

import com.devportal.bff.model.UserActivityEntity;
import com.devportal.bff.model.UserEntity;
import com.devportal.bff.repository.UserActivityRepository;
import com.devportal.bff.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserActivityRepository activityRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<UserEntity> authenticate(String email, String password) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPasswordHash())) {
                logActivity(user.getId(), "Logged in with password credentials");
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    @Transactional
    public UserEntity googleLogin(String email, String name, String role) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        UserEntity user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
            if (user.getGoogleId() == null) {
                user.setGoogleId(UUID.randomUUID().toString()); // Link mock Google ID
                user = userRepository.save(user);
            }
            logActivity(user.getId(), "Logged in via Google OAuth");
        } else {
            // Register new developer via Google OAuth
            user = new UserEntity();
            user.setId("usr-" + UUID.randomUUID().toString().substring(0, 8));
            user.setEmail(email);
            user.setName(name);
            user.setRole(role);
            user.setGoogleId(UUID.randomUUID().toString());
            // Give a secure random password hash for system account
            user.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
            user = userRepository.save(user);
            logActivity(user.getId(), "Registered new account via Google OAuth");
        }
        return user;
    }

    @Transactional
    public boolean changePassword(String userId, String oldPassword, String newPassword) {
        Optional<UserEntity> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
                user.setPasswordHash(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                logActivity(userId, "Updated password hash");
                return true;
            }
        }
        return false;
    }

    @Transactional
    public boolean updateProfile(String userId, String name, String email) {
        Optional<UserEntity> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            // Check email uniqueness if email is changing
            if (!user.getEmail().equalsIgnoreCase(email)) {
                Optional<UserEntity> conflict = userRepository.findByEmail(email);
                if (conflict.isPresent()) {
                    return false;
                }
            }
            user.setName(name);
            user.setEmail(email);
            userRepository.save(user);
            logActivity(userId, "Updated profile info (Name: " + name + ", Email: " + email + ")");
            return true;
        }
        return false;
    }

    public void logActivity(String userId, String activityDescription) {
        UserActivityEntity activity = new UserActivityEntity();
        activity.setId("act-" + UUID.randomUUID().toString().substring(0, 8));
        activity.setUserId(userId);
        activity.setActivity(activityDescription);
        activityRepository.save(activity);
    }

    public List<UserActivityEntity> getActivities(String userId) {
        return activityRepository.findByUserIdOrderByTimestampDesc(userId);
    }
}
