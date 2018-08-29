package com.example.demo.dao;

import com.example.demo.dto.UniqueUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

/**
 * @author cdx
 * @date 2018/4/8
 */
@Repository
public class UniqueUserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public UniqueUser getName(String name) {
        UniqueUser user = null;
        String sql = " select * from f_user where name = ? ";
        SqlRowSet rows = jdbcTemplate.queryForRowSet(sql, new Object[]{name});
        while (rows.next()) {
            user = new UniqueUser();
            user.setName(rows.getString("name"));
            user.setPassword(rows.getString("password"));
        }
        return user;
    }

    public UniqueUser getUniqueName(String name) {
        UniqueUser user = null;
        String sql = " select * from f_user where name = ? and unique_key=1";
        SqlRowSet rows = jdbcTemplate.queryForRowSet(sql, new Object[]{name});
        while (rows.next()) {
            user = new UniqueUser();
            user.setName(rows.getString("name"));
            user.setPassword(rows.getString("password"));
        }
        return user;
    }

    public String getComment(String name) {
        String comment="";
        String sql = " select comment from f_user where name = ? ";
        SqlRowSet rows = jdbcTemplate.queryForRowSet(sql, new Object[]{name});
        while (rows.next()) {
            comment = rows.getString("comment");
        }
        return comment;
    }
}
