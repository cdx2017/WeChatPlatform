package com.example.demo.dto;

import lombok.Data;


/**
 * @author cdx
 * @date 2018/1/10
 */

@Data
public class UniqueUser {
    private String id;
    private String name;
    private String password;
    private String nextgo;

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + name + ", password=" + password + "]";
    }

}
