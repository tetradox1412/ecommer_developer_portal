package com.devportal.bff.controller;

import com.devportal.bff.model.SubmissionDto;
import com.devportal.bff.security.JwtUser;
import com.devportal.bff.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bff/developer")
@RequiredArgsConstructor
public class DeveloperController {

    private final SubmissionService submissionService;

    @GetMapping("/submissions")
    public ResponseEntity<List<SubmissionDto>> getMySubmissions(@AuthenticationPrincipal JwtUser user) {
        return ResponseEntity.ok(submissionService.getSubmissionsForDeveloper(user.id()));
    }
}
