package com.example.demo.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.util.TokenCheckUtils;

@Controller
@RequestMapping("tokenCheckController")
/**
 * Created by DX on 2018/8/29.
 */
public class TokenCheckControlle {

    @RequestMapping("tokenCheck")
    public void tokenCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");

        TokenCheckUtils tokenCheckUtils = new TokenCheckUtils();
        echostr = tokenCheckUtils.tokenCheck(signature, timestamp, nonce, echostr);

        response.getWriter().write(echostr);
    }
}