import Route 	   from 'page.js';
import {Elem}      from './Services/Elements';
import {GameLogic} from './Services/GameLogic';

let baseURL = '';

let loadView = function(view) {
	let viewId = view.path ? view.path.substring(1, view.path.length) : view;

	let views = document.querySelectorAll('.view');
	[].forEach.call(views, (view) => {
		view.style.display = 'none';
	});
	document.getElementById(viewId).style.display = 'block';
	return false;
}

Route(baseURL, () => {
	loadView('splash');
	setTimeout(() => Route(`${baseURL}/menu`), 2000);
});
Route(`${baseURL}/menu`,  function() { loadView('menu');  });
Route(`${baseURL}/rules`, function() { loadView('rules'); });
Route(`${baseURL}/about`, function() { loadView('about'); });
Route(`${baseURL}/game`, () => {	
	Elem.gameoverOverlay.style.display = 'none';
	GameLogic.resetGame();
	loadView('game');
});

Route({
	hashbang: true
});
Route(`${baseURL}`);