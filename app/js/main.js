import {GameLogic}  from './Services/GameLogic';
import {Animation}  from './Services/Animation';
import {Routes}  	from './Routes';

let actionButtons   = document.querySelectorAll('.player .gamebuttons li');

[].forEach.call(actionButtons, actionButton => {
	actionButton.addEventListener('click', (e) => {
		let player   = e.target.dataset.player;
		let computer = GameLogic.getComputerChoice()
		
		Animation.playerMoveAnimation(player);
		Animation.computerMoveAnimation(computer);
		
		setTimeout(()=>{
			if(GameLogic.isTie(player, computer)) {
				Animation.tieAnimation();
			} else if(GameLogic.playerWon(player, computer)) {
				GameLogic.playerScore++;
				Animation.winAnimation();
			} else {
				GameLogic.computerScore++;
				Animation.loseAnimation();
			}
			if(GameLogic.isGameOver()) {
				if(GameLogic.playerWonGame()) {
					Animation.gameoverAnimation("Yeee! You have beaten the evil computer! :D");
				} else {
					Animation.gameoverAnimation("Nooo! You have been beaten by the evil computer! :(");
				}
			}
		}, 500);
	});
});

var playAgainButton = document.getElementsByClassName('play-again')[0];
playAgainButton.addEventListener('click', (e) => {
	GameLogic.resetGame();
	Animation.playAgainAnimation();
});