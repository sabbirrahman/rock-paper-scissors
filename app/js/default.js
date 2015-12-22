function myFunction(){
	x=document.getElementById("splash");  // Find the element
	x.innerHTML=gameplay.htm;    // Change the content
}

	var userChoice = function userchoice(){
		inner
	};
	
	var computerChoice = Math.random();
	
	if (computerChoice <0.34){
		computerChoice = getElementById("rock");
	}else{
		if(computerChoice <0.65){
			computerChoice = getElementById("paper");
		}else{
			computerChoice = getElementById("scissors");
		}
	}
	
	compare(userChoice, computerChoice);



function compare(choice1, choice2){
	if(choice1 === choice2){
		alert("The result is a tie!");
	}else{
		if(choice1 === "rock"){
			if (choice2 === "scissors"){
				alert("rock wins");
			}
			else{
				alert("paper wins");
			}
		}else{
			if(choice1 === "scissors"){
				if (choice2 === "rock"){
					alert("rock wins");
				}
				else{
					alert("paper wins");
				}	
			}else{
				if(choice1 === "paper"){
					if (choice2 === "rock"){
						alert("paper wins");
					}
					else{
						alert("rock wins");
						}
					}
				}
			}
		}
	}