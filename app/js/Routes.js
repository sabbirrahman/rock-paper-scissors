import Route from 'page.js';

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
	loadView('menu');
	//setTimeout(() => Route('/menu'), 3000);
});
Route('/menu', loadView);
Route('/game', loadView);

Route();