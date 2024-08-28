import { LinkedList } from "./linked-list.js";

class HashMap {
	constructor() {
		this._loadFactor = 0.8;
		this._buckets = new Array(16).fill(new LinkedList());
		this._numOfKeys = 0;
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

	set(key, val) {
		const hashCode = hash(key);
		const bucket = this._buckets[hashCode];

		// if the bucket is empty, just append and return.
		if (bucket.size == 0) {
			bucket.append({ key, val });
			this._numOfKeys++;
			return;
		}

		const nodeIndex = bucket.findByKey(key);

		// else if there is no node in the bucket with the specified key, append and return.
		if (nodeIndex == -1) {
			bucket.append({ key, val });
			this._numOfKeys++;
			return;
		}

		// else update existing node
		bucket.updateByValue(nodeIndex, val);
	}

	get(key) {
		const hashCode = hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

		if (nodeIndex == -1) return null;
		else return bucket.at(nodeIndex).val;
	}

	has(key) {
		const hashCode = hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

		return nodeIndex != -1;
	}

	remove(key) {
		const hashCode = hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

		if (nodeIndex != -1) return false;

		bucket.removeAt(nodeIndex);
		this._numOfKeys--;
		return true;
	}

	length() {
		return this._numOfKeys;
	}

	clear() {
		this._buckets = new Array(16).fill(new LinkedList());
		this._numOfKeys = 0;
	}

	keys() {
		let result = [];

		// this is close to O(n²), ouch.
		for (bucket in this._buckets) {
			result.append([...bucket.getKeys()]);
		}

		return result;
	}

	values() {
		let result = [];

		// this is close to O(n²), ouch.
		for (bucket in this._buckets) {
			result.append([...bucket.getValues()]);
		}

		return result;
	}

	entries() {
		let result = [];

		// this is close to O(n²), ouch.
		for (bucket in this._buckets) {
			result.append([...bucket.getPairs()]);
		}

		return result;
	}
}

export { HashMap };
