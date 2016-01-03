import {Elem} from "./Elements";
export let Animation = {
	btnColor: {
		rock 	: 'yellow',
		paper	: 'blue',
		scissors: 'green'
	},
	tieAnimation: function() {
		Elem.msgEl.innerHTML = "Tie! :/";
		Elem.msgEl.style.display = "block";
		Elem.msgEl.classList.add('shake');
		setTimeout(()=> {
			Elem.msgEl.style.display = "none";
			Elem.msgEl.classList.remove('shake');
			Elem.hiddenOverlay.style.display = 'none';
		}, 1000);
	},
	winAnimation: function() {
		Elem.msgEl.innerHTML = "You Won! :D";
		Elem.msgEl.style.display = "block";
		Elem.msgEl.classList.add('flash');
		setTimeout(()=> {
			Elem.msgEl.style.display = "none";
			Elem.msgEl.classList.remove('flash');
			Elem.hiddenOverlay.style.display = 'none';
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
			Elem.hiddenOverlay.style.display = 'none';
		}, 1000);
		Elem.computerScoreEl.innerHTML = ++Elem.computerScoreEl.innerHTML;
	},
	playerMoveAnimation: function(move) {
		Elem.playerChoiceEl.firstChild.classList.add(`icon-${move}`);
		Elem.playerChoiceEl.classList.add(this.btnColor[move]);
		Elem.playerChoiceEl.classList.add('bounceInLeft');
		Elem.playerChoiceEl.style.display = 'inline-block';
		Elem.hiddenOverlay.style.display = 'block';
		setTimeout(()=>{
			Elem.playerChoiceEl.style.display = 'none';
			Elem.playerChoiceEl.classList.remove('bounceInLeft');
			Elem.playerChoiceEl.classList.remove(this.btnColor[move]);
			Elem.playerChoiceEl.firstChild.classList.remove(`icon-${move}`);
		}, 1500);
	},
	computerMoveAnimation: function(move) {
		Elem.computerChoiceEl.firstChild.classList.add(`icon-${move}`);
		Elem.computerChoiceEl.classList.add(this.btnColor[move]);
		Elem.computerChoiceEl.classList.add('reflect');
		Elem.computerChoiceEl.classList.add('bounceInRight');
		Elem.computerChoiceEl.style.display = 'inline-block';
		setTimeout(()=>{
			Elem.computerChoiceEl.style.display = 'none';
			Elem.computerChoiceEl.classList.remove('bounceInRight');
			Elem.computerChoiceEl.classList.remove(this.btnColor[move]);
			Elem.computerChoiceEl.firstChild.classList.remove(`icon-${move}`);
		}, 1500);
	},
	gameoverAnimation: function(msg) {
		Elem.gameoverMsg.innerHTML = msg;
		Elem.gameoverOverlay.classList.add('fadeIn');
		Elem.gameoverOverlay.style.display = 'flex';
		Elem.gameoverDialog.classList.add('zoomIn');
	},

	playAgainAnimation: function() {
		Elem.gameoverMsg.innerHTML = "";
		Elem.gameoverDialog.classList.add('zoomOut');
		Elem.gameoverOverlay.classList.add('fadeOut');
		setTimeout(()=> {
			Elem.gameoverDialog.classList.remove('zoomOut');
			Elem.gameoverOverlay.classList.remove('fadeOut');
			Elem.gameoverOverlay.style.display = 'none';
		}, 500);
	}
}