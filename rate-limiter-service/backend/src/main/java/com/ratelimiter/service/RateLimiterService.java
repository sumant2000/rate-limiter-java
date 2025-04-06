package com.ratelimiter.service;

import com.ratelimiter.model.RateLimitConfig;

public interface RateLimiterService {
    boolean isAllowed(String clientId);
    void configureRateLimit(RateLimitConfig config);
    RateLimitConfig getRateLimitConfig(String clientId);
} 