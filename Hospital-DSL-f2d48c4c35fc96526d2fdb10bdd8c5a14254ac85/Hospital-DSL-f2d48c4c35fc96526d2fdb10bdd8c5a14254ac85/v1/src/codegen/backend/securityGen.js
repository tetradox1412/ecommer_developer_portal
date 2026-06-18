import { writeFile } from './helpers.js';

const PKG = 'com.hospital';

export function generateSecurity(schemaAST, symbolTable, viewsAST, outputDir) {
    console.log('\n🔐 Backend — Security');

    // ── AuthenticatedUser ──────────────────────────────────────
    writeFile(outputDir, 'backend/src/main/java/com/hospital/security/AuthenticatedUser.java', `package ${PKG}.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.*;

public class AuthenticatedUser implements UserDetails {
    private final Long id;
    private final String email;
    private final String passwordHash;
    private final String role;
    private final Long profileId;
    private final String name;

    public AuthenticatedUser(Long id, String email, String passwordHash, String role, Long profileId, String name) {
        this.id = id; this.email = email; this.passwordHash = passwordHash;
        this.role = role; this.profileId = profileId; this.name = name;
    }

    public Long getId() { return id; }
    public String getRole() { return role; }
    public Long getProfileId() { return profileId; }
    public String getName() { return name; }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
    @Override public String getPassword() { return passwordHash; }
    @Override public String getUsername() { return email; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
`);

    // ── JwtTokenProvider ───────────────────────────────────────
    writeFile(outputDir, 'backend/src/main/java/com/hospital/security/JwtTokenProvider.java', `package ${PKG}.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("\${jwt.secret}")
    private String secret;

    @Value("\${jwt.expiration-ms}")
    private long expirationMs;

    private Key getKey() { return Keys.hmacShaKeyFor(secret.getBytes()); }

    public String generateToken(Long userId, String email, String role, Long profileId, String name) {
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .claim("email", email)
            .claim("role", role)
            .claim("profileId", profileId)
            .claim("name", name)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
            .signWith(getKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
    }

    public boolean validateToken(String token) {
        try { parseToken(token); return true; } catch (Exception e) { return false; }
    }
}
`);

    // ── JwtAuthenticationFilter ────────────────────────────────
    writeFile(outputDir, 'backend/src/main/java/com/hospital/security/JwtAuthenticationFilter.java', `package ${PKG}.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (tokenProvider.validateToken(token)) {
                Claims claims = tokenProvider.parseToken(token);
                AuthenticatedUser user = new AuthenticatedUser(
                    Long.parseLong(claims.getSubject()),
                    claims.get("email", String.class),
                    "",
                    claims.get("role", String.class),
                    claims.get("profileId", Long.class),
                    claims.get("name", String.class)
                );
                UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(request, response);
    }
}
`);

    // ── SecurityConfig ─────────────────────────────────────────
    writeFile(outputDir, 'backend/src/main/java/com/hospital/config/SecurityConfig.java', `package ${PKG}.config;

import ${PKG}.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public CorsConfigurationSource corsConfigSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
`);

    // ── AuthController ─────────────────────────────────────────
    // Build login/register driven by LoginGroups
    const selfRegGroups = viewsAST ? viewsAST.loginGroups.filter(g => g.selfRegister) : [];
    const allRoles = schemaAST.auth.roles;

    // For register: we need to know which role has Me: binding for profile creation
    const registerProfileCreation = selfRegGroups.map(group => {
        const role = group.roles[0]; // primary role of the group
        const roleDef = symbolTable.roles.get(role);
        if (!roleDef || !roleDef.meBinding) return '';
        const mod = roleDef.meBinding;
        return `
            if ("${role}".equals(role)) {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                mapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                ${mod} profile = mapper.convertValue(request, ${mod}.class);
                profile = ${mod.charAt(0).toLowerCase() + mod.slice(1)}Repository.save(profile);
                user.setProfileId(profile.getId());
                user = appUserRepository.save(user);
            }`;
    }).join('');

    // Build imports for profile modules
    const profileImports = selfRegGroups.map(group => {
        const role = group.roles[0];
        const roleDef = symbolTable.roles.get(role);
        if (!roleDef || !roleDef.meBinding) return '';
        return `import ${PKG}.model.${roleDef.meBinding};\nimport ${PKG}.repository.${roleDef.meBinding}Repository;`;
    }).filter(Boolean).join('\n');

    const profileAutowires = selfRegGroups.map(group => {
        const role = group.roles[0];
        const roleDef = symbolTable.roles.get(role);
        if (!roleDef || !roleDef.meBinding) return '';
        const mod = roleDef.meBinding;
        return `    @Autowired private ${mod}Repository ${mod.charAt(0).toLowerCase() + mod.slice(1)}Repository;`;
    }).filter(Boolean).join('\n');

    // Allowed roles for registration
    const selfRegRoles = selfRegGroups.flatMap(g => g.roles);
    const selfRegCheck = selfRegRoles.length > 0
        ? `List.of(${selfRegRoles.map(r => `"${r}"`).join(', ')}).contains(role)`
        : 'false';

    writeFile(outputDir, 'backend/src/main/java/com/hospital/security/AuthController.java', `package ${PKG}.security;

import ${PKG}.model.AppUser;
import ${PKG}.repository.AppUserRepository;
${profileImports}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AppUserRepository appUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtTokenProvider tokenProvider;
${profileAutowires}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        return appUserRepository.findByEmail(email)
            .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()))
            .map(user -> {
                String token = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole(), user.getProfileId(), user.getName());
                Map<String, Object> body = new LinkedHashMap<>();
                body.put("token", token);
                body.put("role", user.getRole());
                body.put("name", user.getName());
                body.put("profileId", user.getProfileId());
                return ResponseEntity.ok(body);
            })
            .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials")));
    }

    @PostMapping("/register")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> register(@RequestBody Map<String, Object> request) {
        String email = (String) request.get("email");
        String password = (String) request.get("password");
        String role = (String) request.get("role");
        String name = (String) request.get("name");

        if (!${selfRegCheck}) {
            return ResponseEntity.badRequest().body(Map.of("error", "Self-registration not allowed for role: " + role));
        }

        if (appUserRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }

        AppUser user = new AppUser();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(role);
        user.setName(name);
        user = appUserRepository.save(user);
${registerProfileCreation}

        String token = tokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole(), user.getProfileId(), user.getName());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("token", token);
        body.put("role", user.getRole());
        body.put("name", user.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }
}
`);
}
