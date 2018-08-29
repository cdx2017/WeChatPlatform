<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>主页</title>
    <!-- CSS -->
    <link href="css/index/bootstrap.css" rel="stylesheet">
    <link href="css/index/blog.css" rel="stylesheet">
    <link href="css/index/index.css" rel="stylesheet">
</head>
<body>
<div class="title" id="part0" style="background-color:#019875;padding: 0px;margin: 0px;border-bottom: 0px; "></div>
<div class="blog-masthead">
    <div class="container">
        <nav class="blog-nav">
            <a class="blog-nav-item active" href="#part0">首页</a>
            <a class="blog-nav-item" href="#part1">生活</a>
            <a class="blog-nav-item" href="#part2">旅行</a>
            <a class="blog-nav-item" href="#part3">技术</a>
            <a class="blog-nav-item" onclick="getComment('${param.name}')" style="padding-left: 68%">你好，${param.name}</a>
        </nav>
    </div>
</div>
<div class="intr">
    <span class="avtar"></span>

    <p class="peointr">我叫cdx，一名计算机专业大四的学生。</p>

    <p class="peointr">爱生活，爱旅行，爱技术。</p>
</div>
<div class="title" id="part1">爱生活</div>
<div class="content">
    <div class="pic pic1">
        <a href="mountain?name=${param.name}"><img src="images/index/h1.jpg" alt=""></a>

        <p>家乡-文笔塔下</p>
    </div>
    <div class="pic pic2">
        <a href="jellyfish?name=${param.name}"><img src="images/index/h2.jpg" alt=""></a>

        <p>家乡-华砚湖畔</p>
    </div>
    <div class="pic pic3">
        <a href="plane?name=${param.name}"><img src="images/index/h3.jpg" alt=""></a>

        <p>家乡-士子桥岸</p>
    </div>
</div>
<div class="title" id="part2">爱旅行</div>
<div class="content">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img src="images/index/s1.jpg" alt="">
            </div>
            <div class="item">
                <img src="images/index/s2.jpg" alt="...">
            </div>
            <div class="item">
                <img src="images/index/s3.jpg" alt="...">
            </div>
        </div>
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
<div class="title" id="part3">爱技术</div>
<div class="content">
    <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="#home" role="tab" data-toggle="tab">Web前端</a></li>
        <li><a href="#profile" role="tab" data-toggle="tab">java后台</a></li>
        <li><a href="#messages" role="tab" data-toggle="tab">Mysql数据库</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="home">
            <p class="text">曾就职于公司，任职Web前端工程师职位</p>

            <p class="text">这份工作也让我认识到自己的兴趣所在</p>

            <p class="text">愿今后可以继续研究它</p>
        </div>
        <div class="tab-pane" id="profile">
            <p class="text">曾就职于公司，任职java后台工程师职位</p>

            <p class="text">这份工作也让我认识到自己的兴趣所在</p>

            <p class="text">愿今后继续做前端 做后台技术的狂热者</p>
        </div>
        <div class="tab-pane" id="messages">
            <p class="text">作为一名程序猿</p>

            <p class="text">数据库是必不可少的</p>

            <p class="text">其中我使用Mysql</p>
        </div>
    </div>
</div>
<div class="blog-footer" style="padding-left: 40%" onclick="nextgo()">
    <div class="blob animated" style="background-color: #019875">
        <div class="eyes">
            <div class="eye left-eye"></div>
            <div class="eye right-eye"></div>
        </div>
        <div class="mouth"></div>
    </div>
</div>
<a href="#part0" class="btt">顶部</a>
<!-- Js-->
<script src="js/index/jquery-1.9.1.min.js"></script>
<script src="js/index/bootstrap.min.js"></script>
<script src="js/index/plugin.js"></script>
<script src="js/index/index.js"></script>
</body>
</html>
