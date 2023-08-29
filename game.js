var userClickedPattren = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattren = [];

var level = 0;

var start = 0;

$("body").on("keydown", function () {
  if (start == 0) {
    nextSequence();
    start = 1;
  }
});

function nextSequence() {
  userClickedPattren = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattren.push(randomChosenColor);
  console.log(gamePattren);
  playSound(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattren.push(userChosenColor);
  //   console.log(userClickedPattren);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattren.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattren[currentLevel] === gamePattren[currentLevel]) {
    console.log("success");
    if (userClickedPattren.length === gamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    console.log("fail");
    $("h1").text("Game over, Press any key to restart ");
    startOver();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver() {
  level = 0;
  gamePattren = [];
  start = 0;
}
