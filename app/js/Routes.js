import Route 	   from 'page.js';
import {Elem}      from './Services/Elements';
import {GameLogic} from './Services/GameLogic';

let baseUrl = "/";

let loadView = function(view) {
	let viewId = view.path ? view.path.substring(1, view.path.length) : view;

	let views = document.querySelectorAll('.view');
	[].forEach.call(views, (view) => {
		view.style.display = 'none';
	});
	document.getElementById(viewId).style.display = 'block';
	return false;
}

Route(baseUrl, () => {
	loadView('splash');
	setTimeout(() => Route(`${baseUrl}menu`), 2000);
});
Route(`${baseUrl}menu`,  function() { loadView('menu');  });
Route(`${baseUrl}rules`, function() { loadView('rules'); });
Route(`${baseUrl}about`, function() { loadView('about'); });
Route(`${baseUrl}game`, () => {	
	Elem.gameoverDialog.style.display = 'none';
	Elem.gameoverOverlay.style.display = 'none';
	GameLogic.resetGame();
	loadView('game');
});

Route();