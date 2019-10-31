$(document).ready(function(){

  $("img.search_btn").click(function(){     /*search fade in/out*/
    $("#___gcse_0").fadeToggle(400);
  });


  $("img.login_btn").click(function(){     /*login fade in*/
    $(".login").fadeIn(400);
    $("html").css({overflow:"hidden"});
  });
  $(".login").children(".glyphicon-remove").click(function(){     /*login fade out*/
    $(".login").fadeOut(400);
    $("html").css({overflow:"auto"});
  });


  $("#artist_1").click(function(){     /*artist works fade in*/
    $("#works_1").fadeIn(400);
    $("html").css({overflow:"hidden"});
  });
  $("#artist_2").click(function(){     /*artist works fade in*/
    $("#works_2").fadeIn(400);
    $("html").css({overflow:"hidden"});
  });
  $("#artist_3").click(function(){     /*artist works fade in*/
    $("#works_3").fadeIn(400);
    $("html").css({overflow:"hidden"});
  });

  $(".glyphicon-remove").click(function(){     /*artist works fade out*/
    $("#works_1").scrollTop(0);
    $("#works_2").scrollTop(0);
    $("#works_3").scrollTop(0);
    $("#works_1").fadeOut(400);
    $("#works_2").fadeOut(400);
    $("#works_3").fadeOut(400);
    $("html").css({overflow:"auto"});
  });

  (function() { /*google search*/
    var cx = '011408406026343633144:ugb1pksvhoa';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ /*google-analytics*/
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89930154-1', 'auto');
  ga('send', 'pageview');

 /*FB*/
  //$.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
   FB.init({
     appId: '387247178289384',
     version: 'v2.8' // or v2.1, v2.2, v2.3, ...
   });
   $('#loginbutton,#feedbutton').removeAttr('disabled');
   FB.getLoginStatus(updateStatusCallback);
 });

 /*document.getElementById('shareBtn').onclick = function() {
   FB.ui({
     method: 'share',
     display: 'popup',
     href: 'https://developers.facebook.com/docs/',
   }, function(response){});
 }*/

 /*FB.ui({
    method: 'share',
    href: 'https://developers.facebook.com/docs/',
  }, function(response){});*/



  $(window).scroll(function () { /*scroll + bar*/
    var scrollVal = $(this).scrollTop();
    //console.log(scrollVal);
    $("span.qScrollTop").text(scrollVal);
    if( scrollVal >= 800 ){
      $(".bar").fadeIn(400);
    }else{
      $(".bar").fadeOut(400);
    }
    if( scrollVal >= 300 ){
      $(".glyphicon-chevron-up").fadeIn(400);
    }else{
      $(".glyphicon-chevron-up").fadeOut(400);
    }
  });

  $(".glyphicon-chevron-up").click(function(){ //scrolltop
	   $("html,body").animate({scrollTop: 0}, 1000);
     return false;// 返回false可以避免在原链接后加上#
  });

  $(".glyphicon-chevron-down").click(function(){ //scrolldown
  	$("html,body").animate({scrollTop: $(".container").offset().top}, 1000);
    return false;// 返回false可以避免在原链接后加上#
  });

  var el = document.querySelectorAll('.hamburger'); /*.active添加*/
    for(i = 0; i <= el.length; i++) {
      el[i].addEventListener('click', function(){
        this.classList.toggle('active');
        $("nav").fadeToggle();  /*ham fade in/out*/
      }, false);
    } /*後面加東西的話後面會死掉*/
});


$(document).keydown(function(event){
  // alert("w");
  switch (event.keyCode) {
    case 87: //w
    //  alert('w');
      var pos = $(".movetest").offset();
      alert(pos.left);
      $("movetest").offset({top:pos.top,left:pos.left+100});
      break;
    case 83: //s
    //  alert('s');
      var pos = $(".movetest").offset();
      $("movetest").offset({top:pos.top,left:100});
      break;
    default:
    //  alert(event.keyCode);
      break;
  }
})
