package com.ratelimiter.model;

import lombok.Data;
import java.time.Duration;

@Data
public class RateLimitConfig {
    private String clientId;
    private int maxRequests;
    private Duration timeWindow;
    private String algorithm; // TOKEN_BUCKET or SLIDING_WINDOW
} 