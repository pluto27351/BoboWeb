var player = $(".player");
var bodyArea = $(".ball_area");
var play_area = $("#play_area")
var balls = [];          //0,1,2,3
var monsters = [];
var monstersball = [];   //-1 = 沒有球
var catchedball = -1;  //-1 = 沒有球

var isOnMaster = false;

var up,down,left,right;
var speed =2.0;
var getball = false;
var ballCD = 0;
var ballAmount = 4;
// var ballcolor = ["#FFAA9B", "#86F573", "#8AD5ED", "#FFE68F"];  //, "#C48AFF"
var ballcolor = ["#7c86b8","#b96076", "#e8bb29","#59a87d"];
var monstercolor = ['hue-rotate(-123deg)','hue-rotate(27deg)' ,'hue-rotate(60deg)','hue-rotate(123deg)'];
var test = 'hue-rotate(123deg)';
var gameStart = false;


$(document).ready(function(){
  up = down = left = right = false;
  setInterval(update,10);

});

function update(){
  if(!gameStart)return;

  var pos = player.offset();
  if(up) player.offset({top:pos.top-speed});
  else if(down)player.offset({top:pos.top+speed});

  if(left) player.offset({left:pos.left-speed});
  else if(right)player.offset({left:pos.left+speed});

  limitInScreen();

  if(ballCD <= 0){
    if(!isOnMaster) playerAndBall();
    monsterAndBall();
  }
  else {ballCD -=1;}

  if(catchedball != -1)follow(player,balls[catchedball],15);

}

function randomball(max){
  console.log("12313");
  for(var i=0;i<max;i++){
    var newball = document.createElement("img");
    newball.setAttribute('class','ball');
    newball.setAttribute('src','img/ans_point.png');
    var ball= $(newball);

    var maxH = play_area.height()-30-25;  //球的長寬=25
    var maxW = play_area.width()-40-25;
    var minH =  70;
    var minW =  40;

    var top =  Math.round(Math.random() * (maxH -  minH)) +  minH;
    var left =  Math.round(Math.random() * (maxW - minW)) + minW;
    ball.offset({top: top,left: left});
    var k= i%4;
    //ball.css('background-color',ballcolor[k]);
    ball.css('filter', monstercolor[k]);

    bodyArea.append(newball);
    balls.push(ball);
  }
}



function limitInScreen(){
  var player_pos = player.offset();
  var area_pos = play_area.offset();

  if(player_pos.top < area_pos.top ){player.offset({top: area_pos.top});}
  if(player_pos.left < area_pos.left ){player.offset({left: area_pos.left});}

  var h = player_pos.top + player.height();
  var w = player_pos.left + player.width();
  var bottom = play_area.height() + area_pos.top;
  var right = play_area.width() + area_pos.left;

  if(h >= bottom){
    player.offset({top : bottom - player.height()});
  }
  if(w >= right){
    player.offset({left : right - player.width()});
  }

}


function collision(item,hitObj,padding_top = 0,padding_right = 0){
    if(item == null || hitObj == null){
        return;
    }
    var itemTop = item.offset().top,
        itemFoot = item.offset().top + item.height(),
        itemLeft = item.offset().left,
        itemRight = item.offset().left + item.width();
    var hitTop = hitObj.offset().top + padding_top ,
        hitFoot = hitObj.offset().top + hitObj.height()-padding_top ,
        hitLeft = hitObj.offset().left + padding_right,
        hitRight = hitObj.offset().left + hitObj.width() - padding_right;
    if(itemFoot > hitTop && itemRight > hitLeft && itemTop < hitFoot && itemLeft < hitRight){
      return true;
    }
}


function follow(aim,follower,ptop=0,pright=0) {
  var posY  = aim.offset().top + (aim.height() - follower.height())/2 + ptop;
  var posX  = aim.offset().left + (aim.width() - follower.width())/2 + pright;
  follower.offset({top:posY , left:posX});
}

function aniMove(aim,follower,ptop=0,pright=0) {
  var posY  = aim.offset().top + (aim.height() - follower.height())/2 + ptop;
  var posX  = aim.offset().left + (aim.width() - follower.width())/2 + pright;
  posX = posX - play_area.offset().left;
  posY = posY - play_area.offset().top;
  follower.animate({top:posY , left:posX},100);
}

function playerAndBall(){
  for(var i=0;i<ballAmount;i++){
    if(i != catchedball){
      if(collision(player,balls[i])){
        catchedball= i;
        ballCD = 45;
        return
      }
    }
  }
} //--function playerAndBall--

function monsterAndBall(){
  var touchMonster = false;
  for(var i=0;i<monsters.length;i++){
  //  var monster = monsters[i];
    if(collision(player,monsters[i])){
      touchMonster = true;
      if(!isOnMaster){
        isOnMaster = true;
        var monsterHasBall = monstersball[i];  //紀錄怪物手上的球

        monstersball[i] = catchedball;         //怪物換球 & 球吸到怪物上
        if(monstersball[i] != -1){
          aniMove(monsters[i],balls[catchedball],30);
          monsters[i].css('filter','grayscale(0%)');
          monsters[i].css('filter', monstercolor[catchedball]);
        //  follow(monsters[i],balls[catchedball],20);
        }else{
          monsters[i].css('filter','grayscale(100%)');
        }

        if(monsterHasBall != -1){     //如果怪物有球->腳色換球
          catchedball = monsterHasBall;
        //  follow(player,balls[catchedball],15);
          aniMove(player,balls[catchedball],20);
          getball = true;
        }
        else {
          catchedball = -1;
          getball = false;
        }
        ballCD = 45;
      }
    }
  }
  isOnMaster = touchMonster;
} //--function monsterAndBall--

function checkAns() {
  for(var i=0;i<monstersball.length;i++){
    var ans = monstersball[i];
    monsters[i].attr('src','img/eat.gif');
  }

  setTimeout(function () {
    clearball();
    for(var i=0;i<monstersball.length;i++){
      var ans = monstersball[i];
      console.log("aaa = " + ansNo[ans]);
      if (ansNo[ans] == 1) {
        monsters[i].attr('src','img/test_right.png');
      }else{
        monsters[i].css('filter','grayscale(100%)');
        monsters[i].attr('src','img/test_wrong.png');
      }
    }
  }, 1000);

  setTimeout(function () {
    clearQue();
    createQue();
  }, 2000);

}

function clearball(){
  bodyArea.empty();
  balls.length =0;
  catchedball = -1
}

$(document).keydown(function(event){
  switch (event.keyCode) {
    case 87: //w
    case 38:
      up = true;
      break;
    case 83: //s
    case 40:
      down = true;
      break;
    case 65: //a
    case 37:
      left = true;
      break;
    case 68:
    case 39:
      right = true;
      break;
    default:
     console.log(event.keyCode);
      break;
  }

   if(event.keyCode == 32){
      // getball = false;
      // catchedball = -1;
      // ballCD = 30;
      checkAns();
   }
})


$(document).keyup(function(event){
  switch (event.keyCode) {
    case 87: //w
    case 38:
      up = false;
      break;
    case 83: //s
    case 40:
      down = false;
      break;
    case 65: //a
    case 37:
      left = false;
      break;
    case 68:
    case 39:
      right = false;
      break;
    default:
      break;
  }
})
