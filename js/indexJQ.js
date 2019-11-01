var logo = $('.logo img');
var ball = $('.info img');
var logoSize = [];
var ballSize = [];

var pi = (Math.PI );

$(document).ready(function(){
  logoSize.push(logo.width());
  logoSize.push(logo.height());

  ballSize.push(ball.width());
  ballSize.push(ball.height());

});


function getMousePos(event) {
       var e = event;
       var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
       var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
       var x = e.clientX + scrollX;
       var y = e.clientY + scrollY;
       //alert('x: ' + x + '\ny: ' + y);
       mouxeX= x;
       mouxeY = y;
}

$.fn.animateRotate = function (angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  var initR = MatrixToReg(this.css('transform'));
  angle -= initR;
  var high = angle / (Math.cos((pi*1.2)+pi) + 1);
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      var a = (Math.cos((pi*1.2) / angle * now + pi) + 1) * high;  //回彈  *1.2->增加時間 0~1.2pi
    //  var a = (Math.cos(pi / angle * now + pi) + 1)/2*now;      //正常  +pi->位移圖形至-1~1段落(0~pi)
      $.style(e, 'transform', 'rotate(' + (a+initR) + 'deg)');
      if (step) return step.apply(e, arguments);
    };
    $({deg: 0}).animate({deg: angle}, args);
  });
};

function MatrixToReg(matrix){
  var values = matrix.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  var scale = Math.sqrt(a * a + b * b);

  var sin = b / scale;
  return (Math.round(Math.atan2(b, a) * (180 / Math.PI)));

}

$(".logo").mouseenter(function(){
  $(".logo img").css("width", logoSize[0]*1.05);
  $(".logo img").animateRotate(160,500);
});

$(".logo").mouseleave(function(){
  $(".logo img").css("width", logoSize[0]);
  $(".logo img").animateRotate(0,500);

});

$(".info").mouseenter(function(){
  console.log("in");
  $(".info img").css("width", ballSize[0]*1.05);
  $(".info img").animateRotate(160,500);
});
$(".info").mouseleave(function(){
  $(".info img").css("width", ballSize[0]);
  $(".info img").animateRotate(0,500);
});

$(".quedata").mouseenter(function(){
  $(".quedata img").css("width", ballSize[0]*1.05);
  $(".quedata img").animateRotate(160,500);
});
$(".quedata").mouseleave(function(){
  $(".quedata img").css("width", ballSize[0]);
  $(".quedata img").animateRotate(0,500);
});

$(".bobogame").mouseenter(function(){
  $(".bobogame img").css("width", ballSize[0]*1.05);
  $(".bobogame img").animateRotate(160,500);
});
$(".bobogame").mouseleave(function(){
  $(".bobogame img").css("width", ballSize[0]);
  $(".bobogame img").animateRotate(0,500);
});

$(".game").mouseenter(function(){
  $(".game img").css("width", ballSize[0]*1.05);
  $(".game img").animateRotate(160,500);
});
$(".game").mouseleave(function(){
  $(".game img").css("width", ballSize[0]);
  $(".game img").animateRotate(0,500);
});

$(".people").mouseenter(function(){
  $(".people img").css("width", ballSize[0]*1.05);
  $(".people img").animateRotate(160,500);
});
$(".people").mouseleave(function(){
  $(".people img").css("width", ballSize[0]);
  $(".people img").animateRotate(0,500);
});
