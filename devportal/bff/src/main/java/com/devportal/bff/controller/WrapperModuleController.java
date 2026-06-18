package com.devportal.bff.controller;

import com.devportal.bff.client.WrapperClient;
import com.devportal.bff.model.ModuleApi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/bff/wrapper")
@RequiredArgsConstructor
public class WrapperModuleController {

    private final WrapperClient wrapperClient;

    @GetMapping("/modules/apis")
    public ResponseEntity<List<ModuleApi>> getAllModuleApis() {
        return ResponseEntity.ok(wrapperClient.getAllModuleApis());
    }
}
