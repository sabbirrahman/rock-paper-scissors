import Route 	   from 'page.js';
import {Elem}      from './Services/Elements';
import {GameLogic} from './Services/GameLogic';

let loadView = function(view) {
	let viewId = view.path ? view.path.substring(1, view.path.length) : view;

	let views = document.querySelectorAll('.view');
	[].forEach.call(views, (view) => {
		view.style.display = 'none';
	});
	document.getElementById(viewId).style.display = 'block';
	return false;
}

Route('/'	 , () => {
	loadView('splash');
	setTimeout(() => Route('/menu'), 2000);
});
Route('/menu', loadView);
Route('/rules', loadView);
Route('/about', loadView);
Route('/game', () => {	
	Elem.gameoverDialog.style.display = 'none';
	Elem.gameoverOverlay.style.display = 'none';
	GameLogic.resetGame();
	loadView('game');
});

Route();