import { LinkedList } from "./linked-list.js";

class HashMap {
	constructor() {
		this._load_factor = 0.8;
		this._buckets = new Array(16).fill(new LinkedList());
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this._buckets.length;
		}

		return hashCode % this._buckets.length;
	}
}

export { HashMap };
