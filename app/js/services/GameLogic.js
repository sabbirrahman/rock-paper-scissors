import {Elem} from "./Elements";
export let GameLogic = {
	playerScore : 0,
	computerScore : 0,
	gameOverAt: 10,
	getComputerChoice: function() {
		let computerChoice = Math.random();
		
		return (computerChoice < 0.34) ? 'rock'  :
			   (computerChoice < 0.65) ? 'paper' : 'scissors';
	},

	isTie: function(player, computer) {
		return player === computer ? 1 : 0
	},

	playerWon: function(player, computer){
		if(player === 'rock') {
			return computer === 'scissors' ? 1 : 0;
		}
		else if(player === 'scissors') {
			return computer === 'paper' ? 1 : 0;
		}
		else if(player === 'paper') {
			return computer === 'rock' ? 1 : 0;
		}
	},

	isGameOver: function() {
		return (this.playerScore === this.gameOverAt || this.computerScore === this.gameOverAt)
	},

	playerWonGame: function() {
		return this.playerScore === this.gameOverAt;
	},

	resetGame: function() {
		this.playerScore = 0;
		this.computerScore = 0;
		Elem.playerScoreEl.innerHTML = 0;
		Elem.computerScoreEl.innerHTML = 0;
	}

}