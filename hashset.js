import { LinkedList } from "./linked-list.js";

export default class HashSet {
	constructor() {
		this._loadFactor = 0.75;
		this._numOfKeys = 0;

		this._buckets = new Array(16).fill(null);
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this._buckets.length;
		}

		if (hashCode < 0 || hashCode >= this._buckets.length) {
			throw new Error("Generated a hash code index that is out of bounds!");
		}

		return hashCode % this._buckets.length;
	}

	_expand() {
		const numOfBuckets = this._buckets.length;
		const maxKeys = Math.round(numOfBuckets * this._loadFactor);

		if (this._numOfKeys < maxKeys) return;

		const tempBuckets = this._buckets.slice();
		const newBuckets = new Array(numOfBuckets * 2).fill(null); // double the length of the old bucket

		tempBuckets.forEach((key, idx) => (newBuckets[idx] = key));

		this._buckets = newBuckets;
		console.log("Expanded bucket size.");
	}

	add(key) {
		this._expand();

		const hashCode = this.hash(key);

		// because buckets start as null.
		if (this._buckets[hashCode] == null)
			this._buckets[hashCode] = new LinkedList();

		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.find(key);

		// only append if there is no duplicate.
		if (nodeIndex == -1) {
			bucket.append(key);
			this._numOfKeys++;
		}
	}

	has(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.find(key);

		return nodeIndex != -1;
	}

	remove(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.find(key);

		if (nodeIndex == -1) return false;

		bucket.removeAt(nodeIndex);
		this._numOfKeys--;
		return true;
	}

	length() {
		return this._numOfKeys;
	}

	clear() {
		this._buckets = new Array(16).fill(null);
		this._numOfKeys = 0;
	}

	entries() {
		let result = [];

		this._buckets.forEach((bucket) => {
			if (bucket != null) result.push(bucket.toArray());
		});

		return result.flat();
	}
}
