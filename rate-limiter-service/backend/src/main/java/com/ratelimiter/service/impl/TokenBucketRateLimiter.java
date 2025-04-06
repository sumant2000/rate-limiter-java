package com.ratelimiter.service.impl;

import com.ratelimiter.model.RateLimitConfig;
import com.ratelimiter.service.RateLimiterService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@Service
public class TokenBucketRateLimiter implements RateLimiterService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String TOKEN_BUCKET_KEY = "token_bucket:%s";
    private static final String LAST_REFILL_KEY = "last_refill:%s";

    public TokenBucketRateLimiter(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean isAllowed(String clientId) {
        String bucketKey = String.format(TOKEN_BUCKET_KEY, clientId);
        String lastRefillKey = String.format(LAST_REFILL_KEY, clientId);
        
        RateLimitConfig config = getRateLimitConfig(clientId);
        if (config == null) {
            return false;
        }

        // Refill tokens if needed
        refillTokens(clientId, config);

        // Try to consume a token
        Long remaining = redisTemplate.opsForValue().decrement(bucketKey);
        return remaining != null && remaining >= 0;
    }

    private void refillTokens(String clientId, RateLimitConfig config) {
        String bucketKey = String.format(TOKEN_BUCKET_KEY, clientId);
        String lastRefillKey = String.format(LAST_REFILL_KEY, clientId);

        String lastRefillStr = redisTemplate.opsForValue().get(lastRefillKey);
        Instant lastRefill = lastRefillStr != null ? Instant.parse(lastRefillStr) : Instant.now();
        Instant now = Instant.now();

        if (Duration.between(lastRefill, now).compareTo(config.getTimeWindow()) >= 0) {
            redisTemplate.opsForValue().set(bucketKey, String.valueOf(config.getMaxRequests()));
            redisTemplate.opsForValue().set(lastRefillKey, now.toString());
            redisTemplate.expire(bucketKey, config.getTimeWindow().toSeconds(), TimeUnit.SECONDS);
            redisTemplate.expire(lastRefillKey, config.getTimeWindow().toSeconds(), TimeUnit.SECONDS);
        }
    }

    @Override
    public void configureRateLimit(RateLimitConfig config) {
        String bucketKey = String.format(TOKEN_BUCKET_KEY, config.getClientId());
        String lastRefillKey = String.format(LAST_REFILL_KEY, config.getClientId());

        redisTemplate.opsForValue().set(bucketKey, String.valueOf(config.getMaxRequests()));
        redisTemplate.opsForValue().set(lastRefillKey, Instant.now().toString());
        
        redisTemplate.expire(bucketKey, config.getTimeWindow().toSeconds(), TimeUnit.SECONDS);
        redisTemplate.expire(lastRefillKey, config.getTimeWindow().toSeconds(), TimeUnit.SECONDS);
    }

    @Override
    public RateLimitConfig getRateLimitConfig(String clientId) {
        // In a real implementation, this would fetch from a database or configuration store
        // For demo purposes, returning a default config
        RateLimitConfig config = new RateLimitConfig();
        config.setClientId(clientId);
        config.setMaxRequests(10);
        config.setTimeWindow(Duration.ofMinutes(1));
        config.setAlgorithm("TOKEN_BUCKET");
        return config;
    }
} 