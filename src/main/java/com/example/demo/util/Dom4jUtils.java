package com.example.demo.util;

import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * Created by DX on 2018/8/29.
 */

/**
 * 根据微信端发送的消息，解析出消息类型，加载配置文件，根据消息类型，将消息转发到对应
 * 消息类型对应的Controller中进行响应处理
 *
 * @author SXD
 */
public class Dom4jUtils {


    /**
     * 使用dom4j解析消息类型配置文件，解析获得的相对应的服务器端的地址，进行访问
     *
     * @param msgType
     * @return
     */
    public String msgDispather(String msgType) {
        SAXReader sReader = new SAXReader();
        Document document;
        try {
            document = sReader.read(Dom4jUtils.class.getResourceAsStream("/msgTypeDispather.xml"));
            List<Element> list = document.getRootElement().elements();
            for (Element element : list) {
                if (msgType.equals(element.attributeValue("type"))) {
                    return element.attributeValue("url");
                }
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return null;
    }
}