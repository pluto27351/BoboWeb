var center = $('.center');
var ball = $('.info');
var centerSize = [];
var ballSize = [];

var pi = (Math.PI );


$(document).ready(function(){
  centerSize.push(center.width());
  centerSize.push(center.height());

  ballSize.push(ball.width());
  ballSize.push(ball.height());


});



// $(document).mousemove(function(e){
//   if (e == null) e = window.event;
//
//   mouseX =  e.clientX ;
//   mouseY =  e.clientY ;
//
//   touchedID = e.target.id;
//   console.log("mouseX = "+mouseX + " / mouseY = "+mouseY);
//
// })


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

center.mouseenter(function(){
  centerHover = true;
  center.css("width", centerSize[0]*1.05);
  center.animateRotate(160,500);
});

center.mouseleave(function(){
  centerHover = false;
  center.css("width", centerSize[0]);
  center.animateRotate(0,500);

});

$(".info").mouseenter(function(){
  $(".info").css("width", ballSize[0]*1.05);
  $(".info").animateRotate(160,500);
});
$(".info").mouseleave(function(){
  $(".info").css("width", ballSize[0]);
  $(".info").animateRotate(0,500);
});

$(".quedata").mouseenter(function(){
  $(".quedata").css("width", ballSize[0]*1.05);
  $(".quedata").animateRotate(160,500);
});
$(".quedata").mouseleave(function(){
  $(".quedata").css("width", ballSize[0]);
  $(".quedata").animateRotate(0,500);
});

$(".bobogame").mouseenter(function(){
  $(".bobogame").css("width", ballSize[0]*1.05);
  $(".bobogame").animateRotate(160,500);
});
$(".bobogame").mouseleave(function(){
  $(".bobogame").css("width", ballSize[0]);
  $(".bobogame").animateRotate(0,500);
});

$(".game").mouseenter(function(){
  $(".game").css("width", ballSize[0]*1.05);
  $(".game").animateRotate(160,500);
});
$(".game").mouseleave(function(){
  $(".game").css("width", ballSize[0]);
  $(".game").animateRotate(0,500);
});

$(".people").mouseenter(function(){
  $(".people").css("width", ballSize[0]*1.05);
  $(".people").animateRotate(160,500);
});
$(".people").mouseleave(function(){
  $(".people").css("width", ballSize[0]);
  $(".people").animateRotate(0,500);
});
