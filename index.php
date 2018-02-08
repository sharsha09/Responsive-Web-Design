<?php
    if(isset($_GET["name"])){
        $accessToken= "EAAV8pZCWcS3ABAFS8FRgHota6c9KZCoR41Hy9EfZCTbT1YWdGHpVGZCsguMAh8ZBgPJNlgVBkZBYUu0gdUg1Ps24UUBonZA7rO83WsR68SWz2ceoXo9dCpG2xNsPPjpS4aRwG37Dzfm7vAXWpy9NueVMr1DqzmCBOcZD";
        $valuereturned = $_GET["name"];
        $value = urlencode($valuereturned);
        $typereturned = $_GET["tab"];
        if($typereturned == "Users"){
            $type = "user";
        }else if($typereturned == "Pages"){
            $type = "page";
        }else if($typereturned == "Events"){
            $type = "event";
        }else if($typereturned == "Groups"){
            $type = "group";
        }else if($typereturned == "Places"){
            $type = "place";
        }else{
            $type = "";
        }
        if($typereturned == "Places"){
            $lat = $_GET["lat"];
            $long = $_GET["long"];
            $fburl = "https://graph.facebook.com/v2.8/search?q=$value&type=$type&fields=id,name,picture.width(700).height(700)&center=$lat,$long&access_token=$accessToken";
            $fbjsonobject = file_get_contents($fburl);
            echo $fbjsonobject;
        }else if($typereturned == "Events"){
            $fburl = "https://graph.facebook.com/v2.8/search?q=$value&type=$type&fields=id,name,picture.width(700).height(700),place&access_token=$accessToken";
            $fbjsonobject = file_get_contents($fburl);
            echo $fbjsonobject;
        }else {
            $fburl = "https://graph.facebook.com/v2.8/search?q=$value&type=$type&fields=id,name,picture.width(700).height(700)&access_token=$accessToken";
            $fbjsonobject = file_get_contents($fburl);
            echo $fbjsonobject;
        }
    }

    if(isset($_GET["id"])){
        $accessToken= "EAAV8pZCWcS3ABAFS8FRgHota6c9KZCoR41Hy9EfZCTbT1YWdGHpVGZCsguMAh8ZBgPJNlgVBkZBYUu0gdUg1Ps24UUBonZA7rO83WsR68SWz2ceoXo9dCpG2xNsPPjpS4aRwG37Dzfm7vAXWpy9NueVMr1DqzmCBOcZD";
        $idvalue = $_GET["id"];
        $fbdetailsurl = "https://graph.facebook.com/v2.8/$idvalue?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5)&access_token=$accessToken";
        $fbdetailsjsonobject = file_get_contents($fbdetailsurl);
        echo $fbdetailsjsonobject;
    }
?>