class StorageService {
	query() {
		return localStorage;
	}

	get(key) {
		if(localStorage[key]) {
			return JSON.parse(localStorage.getItem(key));
		} else {
			return [];
		}
	}

	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	delete(key) {
		if(localStorage[key]) {
			localStorage.removeItem(key);
		}
	}

	clear() {
		localStorage.clear();	
	}
}

export let Storage = new StorageService();
