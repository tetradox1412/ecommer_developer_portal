package com.devportal.bff.controller;

import com.devportal.bff.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/bff/status")
@RequiredArgsConstructor
public class StatusStreamController {

    private final SubmissionService submissionService;

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter statusStream(@RequestParam String submissionId) {
        SseEmitter emitter = new SseEmitter(300_000L); // 5 min timeout
        submissionService.registerEmitter(submissionId, emitter);
        return emitter;
    }
}
