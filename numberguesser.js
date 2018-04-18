
var low = document.getElementById("min");
var high = document.getElementById("max");
var play = document.getElementById("submit-range");
var response = document.getElementById("response-text");
var guessSub = document.getElementById("submit-guess");
var lastGuess = document.getElementById("last-guess");
var reset = document.getElementById("reset");
var endReset = document.getElementById("reset-end")
var clear = document.getElementById("clear");
var ticker = document.getElementById("ticker");
var field = document.getElementById("guess-input");
var form = document.getElementById("range-set");
var main = document.getElementById("main");
var nextRound = document.getElementById("next-round");
var players = document.getElementById("two-player");
var onePlayer = document.getElementById("one-player");
var current = document.getElementById("current");
var tally1 = document.getElementById("tally1");
var tally2 = document.getElementById("tally2");
var main = document.getElementById("main");
var displayLevel = document.getElementById("display-level");
var setLevel = document.getElementById("level-set");

var turnClock;
var maxLevel;
var count = 0;
var twoPlayer = false;
var turn2;
var p1Tally = 0;
var p2Tally = 0;
var p1Score = 0;
var p2Score = 0;
var round = 1;
var level = 1;
var target;
var max;
var min;
var gameOn = true;

field.addEventListener('keypress',function(e){
	if(e.keyCode === 13){
		guessEval();
	}
})
play.onclick = startGame;
guessSub.onclick = guessEval;
reset.onclick = resetGame;
endReset.onclick = resetGame;
clear.onclick = clearField;
field.oninput = disableClear;
nextRound.onclick = roundUp;
players.onclick = showLevelSet;
onePlayer.onclick = hideLevelSet;

function showLevelSet() {
	setLevel.removeAttribute("hidden");
}

function hideLevelSet() {
	setLevel.hidden = true;
}

function startGame(e) {
	 e.preventDefault()
	 min = parseInt(low.value);
	 max = parseInt(high.value);
	 maxLevel = parseInt(document.getElementById("max-level").value);
	 lastGuess.innerHTML = "The secret number is between " + min + " and " + max + "."; 
	 setTarget();
	 form.setAttribute("hidden","true");
	 main.removeAttribute("hidden");
	 guessSub.removeAttribute("disabled");
	 displayLevel.innerHTML = ("Level 1:");
	 field.removeAttribute("disabled");
	 if(players.checked){
	 	setUpTwoPlayer();
	 }
}

function setUpTwoPlayer() {
	 	twoPlayer = true;
	 	current.innerHTML = "Player 1";
	 	document.querySelector("#tallies").removeAttribute("hidden");
	 	alert("Whoever guesses the secret number in the fewest attempts takes the round. The winner is determined after " + maxLevel +" round(s)!")
}

function setTarget() {
	target = min + Math.floor(Math.random()*(max-min));
	console.log(max, min, target);
}

function disableClear() {
	clear.removeAttribute("disabled");
}

function clearField() {	
	field.value = "";
	field.setAttribute("placeholder","guess a number");
	clear.setAttribute("disabled","true");
}

function clearElement(element) {
	element.innerHTML = "";
}

function guessEval() {
	count++;
	var guessValue = parseInt(field.value);
	
  if (isNaN(guessValue) || guessValue < min || guessValue > max){
		alert("Guess a number between " + min + " and " + max + "!");
		clearField();
		return;
	} 

	if (parseInt(guessValue) === target){
		winRound();
		return;
	}

  if (guessValue > target) {
		response.innerHTML = "That is too high!";
	}else {
		response.innerHTML = "That is too low!";
	}
	clearField();
	reset.removeAttribute("disabled");
	lastGuess.innerHTML = "Last guess:"
	ticker.innerHTML = guessValue;
}

function winRound() {
	clearField();
	clearElement(lastGuess);
		if(twoPlayer){
			determineWinner();
		}else {
			level++;
		}
	if(gameOn){
		turnClock = setTimeout(roundUp,2500);
	}
	response.innerHTML = "You guessed it in " + count + " attempt(s)!";
	ticker.innerHTML = "BOOM!";
	guessSub.setAttribute("disabled","true");
	field.setAttribute("disabled","true");
	nextRound.removeAttribute("hidden");
	nextRound.removeAttribute("disabled");
}

function determineWinner(){
	if(!turn2){
		p1Tally += count;
	}else {
		p2Tally += count;
	}if(round % 2 == 0){
		levelUp();
		tallyScore();
	}
	round++;
	if(level > maxLevel){
		endGame();
	}
}

function tallyScore(){
	tally1.innerHTML = "Player 1 Score: " + p1Score;
	tally2.innerHTML = "Player 2 Score: " + p2Score;
}

function levelUp(){
	level++;
	if(p1Tally < p2Tally){
		p1Score ++;
	}else if (p1Tally > p2Tally){
		p2Score++;
	}else {
		p1Score ++;
		p2Score ++;
	}
}

function roundUp() {
	clearTimeout(turnClock);
	clearField();
	if(!twoPlayer || turn2 === true){
		turn2 = false;
		min -= 10;
		max += 10;
		if(twoPlayer){
			current.innerHTML = "Player 1";
		}
		lastGuess.innerHTML = "The <em>new</em> secret number is between " 
		+ min + " and " + max + ".";
		response.innerHTML = "How many guesses will it take this time?";
	}
	else{
		current.innerHTML = "Player 2";
		lastGuess.innerHTML = "The secret number is between " + min + " and " + max + "."; 
		response.innerHTML = "How many guesses will it take?";
		turn2 = true;
	}
	clearElement(ticker);
	setTarget();	
	count = 0;
	displayLevel.innerHTML = "Level " + level + ":";
	guessSub.removeAttribute("disabled");
	field.removeAttribute("disabled");
	nextRound.setAttribute("disabled","true");
}

function resetGame() {
	location.reload();
	// clearField();
	// level = 1;
	// main.setAttribute("hidden","true");
	// form.removeAttribute("hidden");
	// lastGuess.innerHTML = "The secret number is between " + min + "and " + max + ".";
	// response.innerHTML = "How many guesses will it take?";
	// ticker.innerHTML = "";
	// displayLevel.innerHTML = "";
	// current.innerHTML = "";
	// count = 0;
	// round = 1;
	// p1Score = 0;
	// p2Score = 0;
	// p1Tally = 0;
	// p2Tally = 0;
	// turn2 =false;
	// tally1.innerHTML = "Player 1 Score: " + p1Score;
	// tally2.innerHTML = "Player 2 Score: " + p2Score;
	// endReset.setAttribute("hidden","true");
}
function endGame() {
	gameOn = false;
	var winner;
	if(p1Score > p2Score){
		winner = "Player 1 wins!"
	}else if(p1Score < p2Score){
		winner = "Player 2 wins!"
	}else if (p1Score === p2Score){
		winner = "It's a tie!"
	}
	current.innerHTML = "<em>" + winner + "</em>";
	displayLevel.innerHTML = 'Game Over:';
	main.setAttribute("hidden","true");
	endReset.removeAttribute("hidden");
}





