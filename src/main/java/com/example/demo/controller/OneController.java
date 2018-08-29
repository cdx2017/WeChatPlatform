package com.example.demo.controller;

import com.example.demo.dao.UniqueUserDao;
import com.example.demo.dto.UniqueUser;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


/**
 * @author cdx
 */
@Controller
public class OneController {

    @Autowired
    UserService userService;

    @Autowired
    UniqueUserDao uniqueUserDao;

    @RequestMapping(value = "/", method = {RequestMethod.GET, RequestMethod.POST})
    public String main(@RequestParam(value = "name", required = false) String name) {
        return "index";
    }

    @RequestMapping(value = "/index", method = {RequestMethod.GET, RequestMethod.POST})
    public String index(HttpSession session, @RequestParam(value = "name", required = false) String name) {
        userService.saveUserToRedis(session.getId(), name);
        return "index";
    }

    @GetMapping("/fireworks")
    public String fireworks() {
        return "fireworks";
    }

    @GetMapping("/fireworks3D")
    public String fireworks3D() {
        return "fireworks3D";
    }

    @GetMapping("/nextgo")
    @ResponseBody
    public UniqueUser nextgo(HttpSession session) {
        UniqueUser uniqueUser = new UniqueUser();
        String name = userService.getNameFromRedis(session.getId());
        String url = "http://localhost/fireworks";
          /* String url = "http://119.27.163.190/fireworks";*/
        uniqueUser.setNextgo(url);
        return uniqueUser;
    }

    @GetMapping("/getcomment")
    @ResponseBody
    public String getComment(@RequestParam("name") String name) {
        return uniqueUserDao.getComment(name);
    }

    @GetMapping("/birthday")
    public String birthday() {
        return "birthday";
    }

}
