<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <%--<meta http-equiv="refresh" content="20;url=http://www.baidu.com" />--%>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        .city {
            width: 100%;
            position: fixed;
            bottom: 0px;
            z-index: 100;
        }

        .city img {
            width: 100%;
        }
    </style>
    <title>烟花漫天</title>
</head>
<body onselectstart="return false">
<canvas id='cas' style="background-color:rgba(0,5,24,1)">浏览器不支持canvas</canvas>
<div class="city"><a href="main"><img src="images/fireworks/city.png" alt=""/></a></div>
<img src="images/fireworks/moon.png" alt="" id="moon" style="visibility: hidden;" />

<div style="display:none">
    <div class="shape">开开心心</div>
    <div class="shape">快快乐乐</div>
    <div class="shape">平平安安</div>
    <div class="shape">健健康康</div>
    <div class="shape">幸幸福福</div>
</div>
<script src="js/fireworks/fireworks.js"></script>
<div style="text-align:center;">

</div>
</body>
</html>