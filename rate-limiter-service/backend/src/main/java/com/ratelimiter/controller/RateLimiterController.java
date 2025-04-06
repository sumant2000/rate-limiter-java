package com.ratelimiter.controller;

import com.ratelimiter.model.RateLimitConfig;
import com.ratelimiter.service.RateLimiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rate-limit")
public class RateLimiterController {
    private final RateLimiterService rateLimiterService;

    public RateLimiterController(RateLimiterService rateLimiterService) {
        this.rateLimiterService = rateLimiterService;
    }

    @PostMapping("/check")
    public ResponseEntity<Boolean> checkRateLimit(@RequestParam String clientId) {
        boolean allowed = rateLimiterService.isAllowed(clientId);
        return ResponseEntity.ok(allowed);
    }

    @PostMapping("/configure")
    public ResponseEntity<Void> configureRateLimit(@RequestBody RateLimitConfig config) {
        rateLimiterService.configureRateLimit(config);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/config/{clientId}")
    public ResponseEntity<RateLimitConfig> getRateLimitConfig(@PathVariable String clientId) {
        RateLimitConfig config = rateLimiterService.getRateLimitConfig(clientId);
        return ResponseEntity.ok(config);
    }
} 