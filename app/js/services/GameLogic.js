export let GameLogic = {
	playerScore : 0,
	computerScore : 0,
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
			return computer === 'scissors' ? 1 : -1;
		}
		else if(player === 'scissors') {
			return computer === 'paper' ? 1 : -1;
		}
		else if(player === 'paper') {
			return computer === 'rock' ? 1 : -1;
		}
	},

	isGameOver: function() {
		return (this.playerScore === 15 || this.computerScore === 15)
	},

	playerWonGame: function() {
		return this.playerScore === 15;
	}
}