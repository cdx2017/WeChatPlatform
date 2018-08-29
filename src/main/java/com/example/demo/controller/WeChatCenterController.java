package com.example.demo.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.common.bean.menu.WxMenu;
import me.chanjar.weixin.common.bean.menu.WxMenuButton;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpConfigStorage;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpMessageHandler;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutTextMessage;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.demo.util.Dom4jUtils;
/*import com.example.demo.util.ButtonMenuUtils;

import com.example.demo.util.RuleManager;*/


/**
 * Created by DX on 2018/8/29.
 */

@Controller
@RequestMapping("centercontroller")
public class WeChatCenterController {

    public WxMpInMemoryConfigStorage config;//微信基本配置信息+Access Token
    public static WxMpService wxMpService;    //微信API的Service
    public WxMpMessageRouter wxMpMessageRouter;//微信消息路由器
    public static String accessToken;


    /**
     * 1.处理微信首次配置信息+创建按钮   【首次创建后可以  注释initWeiXin()方法 不用每次都执行】
     * 2.验证接口配置信息 【如果过时重新获取】
     * 3.消息转发---中转站   【每次微信端的信息都会从微信服务器转发到这里，然后从这里转发出去】
     *
     * @param request
     * @param response
     * @return
     * @throws IOException
     * @throws WxErrorException
     */
    @RequestMapping("test")
    public String test1(HttpServletRequest request, HttpServletResponse response) throws IOException, WxErrorException {
        /**
         * 1.处理微信首次配置信息+创建按钮
         */
//        initWeiXin();
        /**
         * 2.验证接口配置信息  如果过时重新获取
         */
        String echostr = request.getParameter("echostr");
        if (echostr != null) {
            return "forward:/tokenCheckController/tokenCheck.htmls";
        }

        /**
         * 3.消息转发---中转站  每次微信端的消息都会来到这里进行分发
         */
        WxMpXmlMessage message = WxMpXmlMessage.fromXml(request.getInputStream());
        String msgType = message.getMsgType();
        Dom4jUtils dom4El = new Dom4jUtils();
        String url = dom4El.msgDispather(msgType);
        if (url != null) {
            request.setAttribute("message", message);
            return url;
        }

        response.getWriter().write("无法辨识消息类型！！");
        return null;

    }


    /**
     * 初始化 微信相关配置  并且创建按钮
     *
     * @throws WxErrorException
     */
    public void initWeiXin() throws WxErrorException {
        config = new WxMpInMemoryConfigStorage();
        config.setAppId("wx4848686e5bd4efce"); // 设置微信公众号的appid
        config.setSecret("fc37ce345b3612d615d4ead83f21bdff"); // 设置微信公众号的app corpSecret
        config.setToken("dxchen"); // 设置微信公众号的token

        wxMpService = new WxMpServiceImpl();
        wxMpService.setWxMpConfigStorage(config);//创建自己的service
        if (config.getAccessToken() == null) {
            accessToken = wxMpService.getAccessToken(true);//手动刷新获取了Access Token
        }
        //创建菜单按钮
        /*ButtonMenuUtils bm = new ButtonMenuUtils();
        WxMenu menu = bm.createButtonMenu();
        wxMpService.getMenuService().menuCreate(menu);*/
    }

}