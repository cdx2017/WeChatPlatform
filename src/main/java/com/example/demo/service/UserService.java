package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * @author Administrator
 * @date 2018/4/23
 */
@Service
public class UserService {
    /**
     * 信息存入redis
     */

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * @param sessionId sessionid
     * @param name      名字
     */
    public void saveUserToRedis(String sessionId, String name) {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        valueOperations.set(sessionId, name, 10, TimeUnit.MINUTES);
    }

    /**
     * @param sessionId sessionid
     * @return
     */
    public String getNameFromRedis(String sessionId) {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        String verifyName = (String) valueOperations.get(sessionId);
        return verifyName;
    }
}
