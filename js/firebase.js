var ansbox = document.getElementById("ans");
var queNum = [];
var queMax = 22;
var queMaxGet = 7;
var nowQueNo = 0;
var ansNo = [];
var dbQue;

$(document).ready(function(){
  var firebaseConfig = {
      apiKey: "AIzaSyBfco5_4skuKC8hFYtFTJMu4jw9QuulUVs",
      authDomain: "boboweb-870fd.firebaseapp.com",
      databaseURL: "https://boboweb-870fd.firebaseio.com",
      projectId: "boboweb-870fd",
      storageBucket: "boboweb-870fd.appspot.com",
      messagingSenderId: "794460010195",
      appId: "1:794460010195:web:e390afc09752bbc8e94626"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //dbQue = firebase.database().ref().child('question');

  randomQue();
  createQue();
  //setInterval(update,60);


});


function randomQue(){
  nowQueNo = 0;
  for(var i=0;i<queMax;i++){
    queNum[i] = i+1;
  }

  for(var i=0;i<30;i++){
    var a = Math.round(Math.random()* (queMax-1));
    var b = Math.round(Math.random()* (queMax-1));
    var t = queNum[a];
    queNum[a] = queNum[b];
    queNum[b] = t;
  }

  // for(var i=0;i<queMax;i++){
  //     console.log(i + " = " + queNum[i]);
  // }
}

function createQue(){
  if(nowQueNo >= queMaxGet) {
    alert("完成題目!")
    return;
  }

  var dbQueNo = firebase.database().ref().child('question').child(queNum[nowQueNo]);

  dbQueNo.on('child_added', function (snapshot) {
    if(snapshot.key == 'q'){
      var data = snapshot.val();
      $('.question').html(data);
    }
    else if(snapshot.key == 'a'){
      var maxAns = snapshot.numChildren();
      var anss = [];

      var ansCount = snapshot.child('max').val();

      for(var i=0;i<maxAns-1;i++){
        anss.push(snapshot.child(i+1).val());
        if(i < ansCount)ansNo.push(1);
        else ansNo.push(0);
      }

      for(var i=0;i<30;i++){
        var a = Math.round(Math.random()* (maxAns-2));
        var b = Math.round(Math.random()* (maxAns-2));
        var t = anss[a];
        anss[a] = anss[b];
        anss[b] = t;

        t = ansNo[a];
        ansNo[a] = ansNo[b];
        ansNo[b] = t;

      }

      for(var i=0;i<maxAns-1;i++){
        var ans = anss[i];
        console.log("ans =" + anss[i] + "correct = " + ansNo[i]);
        var newball = document.createElement("h4");
        newball.setAttribute('class','answer_style');
        if((i+1) == maxAns-1){newball.setAttribute('class','answer_style last_box')}

        var ball= $(newball);
        ball.html(ans);
        ball.css('background-color',ballcolor[i]);

        $('.ans_area').append(newball);
      }

      for(var i=0;i<ansCount;i++){
        var monster = document.createElement("img");
        monster.setAttribute('src','img/test.png');
        monster.setAttribute('class','monster_style');
        if(i==ansCount-1) monster.setAttribute('class','monster_style last_box');
        monsters.push($(monster));
        monstersball.push(-1);
        //$(monster).css('color',ballcolor[i]);
        $('.monster_area').append(monster);
      }

    }
  });

  gameStart = true;
  randomball(ballAmount);
  nowQueNo++;
}

function clearQue(){
  $('.question').html("");
  $('.ans_area').empty();
  $('.monster_area').empty();

  ansNo.length =0;
  monsters.length = 0;
  monstersball.length = 0;
//  queNum.length = 0;
}

$(document).keyup(function(event){
  if (event.keyCode == 73){
    clearQue();
    createQue();
  }
})
