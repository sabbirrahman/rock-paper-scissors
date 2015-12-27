import {Elem} from "./Elements";
export let Animation = {
	tieAnimation: function() {
		Elem.msgEl.innerHTML = "Tie! :/";
		Elem.msgEl.style.display = "block";
		Elem.msgEl.classList.add('shake');
		setTimeout(()=> {
			Elem.msgEl.style.display = "none";
			Elem.msgEl.classList.remove('shake');
		}, 1000);
	},
	winAnimation: function() {
		Elem.msgEl.innerHTML = "You Won! :D";
		Elem.msgEl.style.display = "block";
		Elem.msgEl.classList.add('flash');
		setTimeout(()=> {
			Elem.msgEl.style.display = "none";
			Elem.msgEl.classList.remove('flash');
		}, 1000);
		Elem.playerScoreEl.innerHTML = ++Elem.playerScoreEl.innerHTML;
	},
	loseAnimation: function() {
		Elem.msgEl.innerHTML = "You Lose! :(";
		Elem.msgEl.style.display = "block";
		Elem.msgEl.classList.add('swing');
		setTimeout(()=> {
			Elem.msgEl.style.display = "none";
			Elem.msgEl.classList.remove('swing');
		}, 1000);
		Elem.computerScoreEl.innerHTML = ++Elem.computerScoreEl.innerHTML;
	},
	playerMoveAnimation: function() {
		Elem.playerChoiceEl.classList.add('bounceInLeft');
		Elem.playerChoiceEl.style.display = 'inline-block';
		setTimeout(()=>{
			Elem.playerChoiceEl.style.display = 'none';
			Elem.playerChoiceEl.classList.remove('bounceInLeft');
		}, 2500);
	},
	computerMoveAnimation: function() {
		Elem.computerChoiceEl.classList.add('bounceInRight');
		Elem.computerChoiceEl.style.display = 'inline-block';
		setTimeout(()=>{
			Elem.computerChoiceEl.style.display = 'none';
			Elem.computerChoiceEl.classList.remove('bounceInRight');
		}, 2000);
	},
	gameoverAnimation: function(msg) {
		Elem.gameoverMsg = gameoverMsg.innerHTML = msg;
		Elem.gameoverOverlay.classList.add('fadeIn');
		Elem.gameoverOverlay.style.display = 'table-cell';
		Elem.gameoverDialog.classList.add('zoomIn');
		Elem.gameoverDialog.style.display = 'block';
	}
}