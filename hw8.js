/*window.onload = function(){
        navigator.geolocation.getCurrentPosition(function(position) {  
          window.currentLat = position.coords.latitude;
          window.currentLong = position.coords.longitude;
        });
    };*/

function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position){
        currentLat = position.coords.latitude;
        currentLong = position.coords.longitude;
    });
}

$(document).ready(function(){
    
    window.fbAsyncInit = function() {
		FB.init({
			appId      : '1544435705596784',
			xfbml      : true,
			version    : 'v2.5'
		});
	};
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
    
    $("#firstpage").hide();
    $("#firstpagetable").hide();
    $("#favoritespageid").hide();
    $("#secondpage").hide();
    $(".pager").hide();
    $("#right").hide();
    $("#left").hide();
    $("#back").click(function(){
        var tab = $('.nav-pills .active').text();
        if(tab == "Favorites"){
           $("#secondpage").hide();
           $("#favoritespageid").show();
        } else {
            $("#secondpage").hide();
            $("#firstpage").show();  
        }
    });
    $(".tabsclick").click(function(){
        //alert("whh");
        $(this).tab('show');
    });
    
    $("#search, .tabsclick").click(function(){
        var tab = $('.nav-pills .active').text();
        if(tab == "Favorites"){
            showfavorites();
        } else {
        var field = $('#field').val();
        //alert(currentLat);
        $.ajax({
            type : 'GET',
            url : 'index.php',
            data : {name: field, tab: tab, lat: currentLat, long: currentLong },
            async: true,
            success: function(data){
                //console.log(data); // Alert the results
                data = JSON.parse(data);
                //array = obj.data;
                //console.log(data.data[0].id); - will print first id
                var trHTML='';
                $.each(data.data, function(i, val){
                var idatt = val.id;
                var j = i+1;
                boo = starretained(val.id);
                if(boo == true){
                    trHTML += '<tr><td>' + j + '</td><td><img src=' + val.picture.data.url + ' height="30" width="40"></td><td>' + val.name + '</td><td><button type="button" class="btn btn-default btn-sm" onclick="favoritespage(\''+val.id+'\',\''+val.name+'\',\''+val.picture.data.url+'\',\''+tab+'\');"><span class="glyphicon glyphicon-star"></span></button></td><td><button type="button" class="btn btn-default btn-sm" onclick="detailspage(' + val.id + ');"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';
                }else {
                    trHTML += '<tr><td>' + j + '</td><td><img src=' + val.picture.data.url + ' height="30" width="40"></td><td>' + val.name + '</td><td><button type="button" class="btn btn-default btn-sm" onclick="favoritespage(\''+val.id+'\',\''+val.name+'\',\''+val.picture.data.url+'\',\''+tab+'\');"><span class="glyphicon glyphicon-star-empty"></span></button></td><td><button type="button" class="btn btn-default btn-sm" onclick="detailspage(' + val.id + ');"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';
                }
                    //console.log(val.picture.data.url);
                });
                $("#firstpagetbody").html(trHTML);
                $("#favoritespageid").hide();
                $("#secondpage").hide();
                $("#firstpage").show();
                $("#firstpagetable").show();
                var ppage = '<button type="button" class="btn btn-default" onclick="displaypage(\'' + data.paging.previous + '\');">Previous</button>';
                var npage = '<button type="button" class="btn btn-default" onclick="displaypage(\'' + data.paging.next + '\');">Next</button>';
                $("#left").html(ppage);
                $("#right").html(npage);
                if(data.paging.next){
                    $("#right").show();
                }
                if(data.paging.previous){
                    $("#left").show();
                }
                
                
                //$(".pager").show();
                //$("#test").text(obj);
                
            }
        });
        }
    });
    

    
    
    $("#clearButton").click(function(){
        document.getElementById('field').value='';
        $(".nav-pills > li.active").removeClass('active');
        $("#defaultactive").addClass('active');
        $("#firstpage").hide();
        $("#firstpagetable").hide();
        $("#right").hide();
        $("#left").hide();
        $("#secondpage").hide();
        $("#favoritespageid").hide();
        localStorage.clear();
    });
});



function starretained(id){
    var allids = Object.keys(localStorage);
    for(i=0;i<allids.length;i++){
        if(id == allids[i]){
            return true;
        }
    }
    return false;
}

// next and previous
function displaypage(url){
        //console.log(url);
        //data = JSON.parse(nexturl);
        //console.log(data);
        $.getJSON(url, function(data){
            //data = JSON.parse(data);
            //console.log(data);
            var trHTML='';
            $.each(data.data, function(i, val){
            var j = i+1;
            trHTML += '<tr><td>' + j + '</td><td><img src=' + val.picture.data.url + ' height="30" width="40"></td><td>' + val.name + '</td><td><button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-star-empty"></span></button></td><td><button type="button" class="btn btn-default btn-sm" onclick="detailspage(' + val.id + ');"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';

                //console.log(val.picture.data.url);
            });
            $("#firstpagetbody").html(trHTML);
            $("#favoritespageid").hide();
            $("#secondpage").hide();
            $("#firstpage").show();
            $("#firstpagetable").show();
            var ppage = '<button type="button" class="btn btn-default" onclick="displaypage(\'' + data.paging.previous + '\');">Previous</button>';
                var npage = '<button type="button" class="btn btn-default" onclick="displaypage(\'' + data.paging.next + '\');">Next</button>';
                $("#left").html(ppage);
                $("#right").html(npage);
                $("#left").hide();
                 $("#right").hide();
                if(data.paging.previous){
                    $("#left").show();
                }
                if(data.paging.next){
                    $("#right").show();
                }
        });
    }


function postFB(name, picture) {
    
        FB.ui({
            app_id: '1544435705596784',
            method: 'feed',
            link: window.location.href,
            picture: picture,
            name: name,
            caption:'FB SEARCH FROM USC CSCI571',
            display: 'popup'
        }, function (response) {
            if (response && !response.error_message) {
                alert('Posted Successfully');
            } else {
                alert('Not Posted');
            }
        });
    }

function favoritespage(id, name,url,tab){
    //console.log(id,name,url,tab);
    //var j = 1;
    //var fhtml='';
    //fhtml += '<tr><td>' + j + '</td><td><img src=' + url + ' height="30" width="40"></td><td>' + name + '</td><td>' + tab + '</td><td><button type="button" class="btn btn-default btn-sm" ><span class="glyphicon glyphicon-trash"></span></button></td><td><button type="button" class="btn btn-default btn-sm" onclick="detailspage(' + id + ');"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';
    
    //$("#favoritespagetbody").append(fhtml);
    //$("#firstpage").hide();
    //$("#favoritespagetable").show();
    
    var fav = { "name": name, "url": url, "tab": tab};
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(id,JSON.stringify(fav));
        //console.log(localStorage);
    }else{
          alert("localStorage not accessible");
    }
}
function showfavorites(){
    //console.log("insi");
    //$("#firstpage").toggle();
    //$("#favoritespagetable").toggle();
    var j = 0;
    var fhtml='';
     for(x in localStorage){
          if(localStorage.getItem(x) != null){
            //console.log(JSON.parse(localStorage.getItem(x)));
             favo = JSON.parse(localStorage.getItem(x));
             lname = favo.name;
             lurl = favo.url;
              ltab = favo.tab;
              lid = x;
              j = j+1;
              
              fhtml += '<tr><td>' + j + '</td><td><img src=' + lurl + ' height="30" width="40"></td><td>' + lname + '</td><td>' + ltab + '</td><td><button type="button" class="btn btn-default btn-sm" onclick="deletefav('+lid+');"><span class="glyphicon glyphicon-trash"></span></button></td><td><button type="button" class="btn btn-default btn-sm" onclick="detailspage(\''+lid+'\',\''+ltab+'\');"><span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';
          }
        }
    $("#favoritespagetbody").html(fhtml);
    $("#firstpage").hide();
    $("#secondpage").hide();
    $("#favoritespageid").show();
}

function deletefav(id){
    localStorage.removeItem(id);
    showfavorites();
    
}
//ajax call when button is pressed
function detailspage(id, tabtype){
        var tab = $('.nav-pills .active').text();
        var field = $('#field').val();
        //alert(tab);
        if(tab == "Events" || tabtype == "Events"){
            var httag = '';
            httag += '<p align="center">No data found</p>';
            $("#writeamsg").html(httag);
            $("#writeamsg").show();
            $("#hidealbums").hide();
            
            var htag = ''
            htag += '<p align="center">No data found</p>';
            $("#writepmsg").html(htag);
            $("#writepmsg").show();
            $("#hideposts").hide();
            
            $("#secondpage").show();
            $("#firstpage").hide();
            $("#favoritespageid").hide();
        } else { 
        $.ajax({
            type : 'GET',
            url : 'index.php',
            data : {id: id},
            async: true,
            success: function(data){
                //console.log(data); // Alert the results
                data = JSON.parse(data);
                //console.log(data);
                //array = obj.data;
                //console.log(data); //- will print first id
                var htmltag = '';
                if(!(data.albums)){
                        //alert("empty");
                        htmltag += '<p align="center">No data found</p>';
                        $("#writeamsg").html(htmltag);
                        $("#writeamsg").show()
                        $("#hidealbums").hide();
                } else {
                    $("#writeamsg").hide();
                    $("#hidealbums").show();
                    accessToken = "EAAV8pZCWcS3ABAFS8FRgHota6c9KZCoR41Hy9EfZCTbT1YWdGHpVGZCsguMAh8ZBgPJNlgVBkZBYUu0gdUg1Ps24UUBonZA7rO83WsR68SWz2ceoXo9dCpG2xNsPPjpS4aRwG37Dzfm7vAXWpy9NueVMr1DqzmCBOcZD"
                    //temppic1 = data.albums.data[0].photos.data[0].picture;
                    if(data.albums.data[0].name){
                        name0 = data.albums.data[0].name;
                        $("#photoname0").html(name0);
                    }
                    
                        if(data.albums.data[0].photos.data[0].picture){
                            pic10 = data.albums.data[0].photos.data[0].picture;
                            id10 = data.albums.data[0].photos.data[0].id;
                            largerimageurl10 = "https://graph.facebook.com/v2.8/"+id10+"/picture?access_token="+accessToken;
                            imgtag = "<img src=" + largerimageurl10 + "/>";
                            $("#image01").html(imgtag);
                        }
                        if(data.albums.data[0].photos.data[1].picture){
                            pic20 = data.albums.data[0].photos.data[1].picture;
                            id20 = data.albums.data[0].photos.data[1].id;
                            largerimageurl20 = "https://graph.facebook.com/v2.8/"+id20+"/picture?access_token="+accessToken;
                            imgtag = "<img src=" + largerimageurl20 + "/>";
                            $("#image02").html(imgtag);
                        }
                    
                    
                    if(data.albums.data[2].name){
                        name1 = data.albums.data[1].name;
                        $("#photoname1").html(name1);
                    }
                    if(data.albums.data[1].photos.data[0].picture){
                        pic11 = data.albums.data[1].photos.data[0].picture;
                        id11 = data.albums.data[1].photos.data[0].id;
                        largerimageurl11 = "https://graph.facebook.com/v2.8/"+id11+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl11 + "/>";
                        $("#image11").html(imgtag);
                    }
                    if(data.albums.data[1].photos.data[1].picture){
                        pic21 = data.albums.data[1].photos.data[1].picture;
                        id21 = data.albums.data[1].photos.data[1].id;
                        largerimageurl21 = "https://graph.facebook.com/v2.8/"+id21+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl21 + "/>";
                        $("#image12").html(imgtag);
                    }
                    
                    if(data.albums.data[2].name){
                        name2 = data.albums.data[2].name;
                        $("#photoname2").html(name2);
                    }
                    if(data.albums.data[2].photos.data[0].picture){
                        pic12 = data.albums.data[2].photos.data[0].picture;
                        id12 = data.albums.data[2].photos.data[0].id;
                        largerimageurl12 = "https://graph.facebook.com/v2.8/"+id12+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl12 + "/>";
                        $("#image21").html(imgtag);
                    }
                    if(data.albums.data[2].photos.data[1].picture){
                        pic22 = data.albums.data[2].photos.data[1].picture;
                        id22 = data.albums.data[2].photos.data[1].id;
                        largerimageurl22 = "https://graph.facebook.com/v2.8/"+id22+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl22 + "/>";
                        $("#image22").html(imgtag);
                    }
                    
                    if(data.albums.data[3].name){
                        name3 = data.albums.data[3].name;
                        $("#photoname3").html(name3);
                    }
                    if(data.albums.data[3].photos.data[0].picture){
                        pic13 = data.albums.data[3].photos.data[0].picture;
                        id13 = data.albums.data[3].photos.data[0].id;
                        largerimageurl13 = "https://graph.facebook.com/v2.8/"+id13+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl13 + "/>";
                        $("#image31").html(imgtag);
                    }
                    if(data.albums.data[3].photos.data[1].picture){
                        pic23 = data.albums.data[3].photos.data[1].picture;
                        id23 = data.albums.data[3].photos.data[1].id;
                        largerimageurl23 = "https://graph.facebook.com/v2.8/"+id23+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl23 + "/>";
                        $("#image32").html(imgtag);
                    }
                    
                    if(data.albums.data[4].name){
                        name4 = data.albums.data[4].name;
                        $("#photoname4").html(name4);
                    }
                    if(data.albums.data[4].photos.data[0].picture){
                        pic14 = data.albums.data[4].photos.data[0].picture;
                        id14 = data.albums.data[4].photos.data[0].id;
                        largerimageurl14 = "https://graph.facebook.com/v2.8/"+id14+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl14 + "/>";
                        $("#image41").html(imgtag);
                    }
                    if(data.albums.data[4].photos.data[1].picture){
                        pic24 = data.albums.data[4].photos.data[1].picture;
                        id24 = data.albums.data[4].photos.data[1].id;
                        largerimageurl24 = "https://graph.facebook.com/v2.8/"+id24+"/picture?access_token="+accessToken;
                        imgtag = "<img src=" + largerimageurl24 + "/>";
                        $("#image42").html(imgtag);
                    }
                }
                
                var htmltg = "";
                //console.log(data.posts);
                if(!(data.posts)){
                        htmltg += '<p align="center">No data found</p>';
                        $("#writepmsg").html(htmltg);
                        $("#writepmsg").show()
                        $("#hideposts").hide();
                } else{
                    $("#writepmsg").hide();
                    $("#hideposts").show();
                    
                    if(data.posts.data[0].message){
                            time0 = data.posts.data[0].created_time;
                            poststag0 = "";
                            poststag0 += '<div class="row"><div class="col-md-1"><img src=' + data.picture.data.url + ' height="30" width="40"></div><div class="col-md-11 text-left">' + data.name + '</div></div><br>';
                            poststag0 += '<p>' + data.posts.data[0].message + '</p>';
                            $("#posts0").html(poststag0);
                    }
                    if(data.posts.data[1].message){
                            time1 = data.posts.data[1].created_time;
                            poststag1 = "";
                            poststag1 += '<div class="row"><div class="col-md-1"><img src=' + data.picture.data.url + ' height="30" width="40"></div><div class="col-md-11 text-left">' + data.name + '</div></div><br>';
                            poststag1 += '<p>' + data.posts.data[1].message + '</p>';
                            $("#posts1").html(poststag1);
                    }
                    if(data.posts.data[2].message){
                            time2 = data.posts.data[2].created_time;
                            poststag2 = "";
                            poststag2 += '<div class="row"><div class="col-md-1"><img src=' + data.picture.data.url + ' height="30" width="40"></div><div class="col-md-11 text-left">' + data.name + '</div></div><br>';
                            poststag2 += '<p>' + data.posts.data[2].message + '</p>';
                            $("#posts2").html(poststag2);
                    }
                    if(data.posts.data[3].message){
                            time3 = data.posts.data[3].created_time;
                            poststag3 = "";
                            poststag3 += '<div class="row"><div class="col-md-1"><img src=' + data.picture.data.url + ' height="30" width="40"></div><div class="col-md-11 text-left">' + data.name + '</div></div><br>';
                            poststag3 += '<p>' + data.posts.data[3].message + '</p>';
                            $("#posts3").html(poststag3);
                    }
                    if(data.posts.data[4].message){
                            time4 = data.posts.data[4].created_time;
                            poststag4 = "";
                            poststag4 += '<div class="row"><div class="col-md-1"><img src=' + data.picture.data.url + ' height="30" width="40"></div><div class="col-md-11 text-left">' + data.name + '</div></div><br>';
                            poststag4 += '<p>' + data.posts.data[4].message + '</p>';
                            $("#posts4").html(poststag4);
                    }
                    
                }
                $("#secondpage").show();
                $("#firstpage").hide();
                $("#favoritespageid").hide();
                
                //$("#test").text(obj);
                
                $("#fbimg").click(function(){
                    FB.ui({
                        app_id: '1544435705596784',
                        method: 'feed',
                        link: window.location.href,
                        picture: data.picture.data.url,
                        name: data.name,
                        caption:'FB SEARCH FROM USC CSCI571',
                        display: 'popup'
                    }, function (response) {
                        if (response && !response.error_message) {
                            alert('Posted Successfully');
                        } else {
                            alert('Not Posted');
                        }
                    });
                                
                });
                
            }
        });
        }
    
}