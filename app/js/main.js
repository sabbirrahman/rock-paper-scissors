import {GameLogic}  from './Services/GameLogic';
import {Animation}  from './Services/Animation';
import {Storage} 	from './Services/Storage';
import {Routes}  	from './Routes';

let actionButtons   = document.querySelectorAll('.player .gamebuttons li');

[].forEach.call(actionButtons, actionButton => {
	actionButton.addEventListener('click', (e) => {
		let player   = e.target.dataset.player;
		let computer = GameLogic.getComputerChoice()
		
		Animation.playerMoveAnimation();
		setTimeout(()=> {
			Animation.computerMoveAnimation();
		}, 500);
		
		if(isGameOver()) {
			if(GameLogic.playerWonGame()) {
				Animation.gameoverAnimation("Yeee! You beat the evil computer! :D");
			} else {
				Animation.gameoverAnimation("Nooo! You have been beaten by the evil computer! :(");
			}
		} else {
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
			}, 1500);
		}
	});
});