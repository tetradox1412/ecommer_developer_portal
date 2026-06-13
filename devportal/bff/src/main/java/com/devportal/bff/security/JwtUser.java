package com.devportal.bff.security;

public record JwtUser(
    String id,
    String email,
    String role
) {}
