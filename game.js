var buttonColors = ["green", "blue", "yellow", "red"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
  if(!started) {
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  started = true;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  var object = $("#" + currentColor);
  object.addClass("pressed");
  setTimeout(function() {
    object.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log(currentLevel);
    console.log("Success");
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, press any key to restart!");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    startOver();
  }
  if(userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
          nextSequence();
        }, 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
