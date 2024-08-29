import { LinkedList } from "./linked-list.js";

class HashMap {
	constructor() {
		this._loadFactor = 0.75;
		this._numOfKeys = 0;

		// This used to be filled with 'new LinkedList()', but it turns out that
		// It was filling the entire array with just one linked list which is stupid.
		// So i swapped it for 'null' instead. and when set() is called,
		// It automatically fills in the appropriate cell with a new LinkedList().
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

		tempBuckets.forEach((val, idx) => (newBuckets[idx] = val));

		this._buckets = newBuckets;
	}

	set(key, val) {
		this._expand();

		const hashCode = this.hash(key);

		// because buckets start as null.
		if (this._buckets[hashCode] == null)
			this._buckets[hashCode] = new LinkedList();

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
		bucket.updateValueAt(nodeIndex, val);
	}

	get(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

		if (nodeIndex == -1) return null;
		else return bucket.at(nodeIndex).val.val; // ah yes, *val.val* .
	}

	has(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

		return nodeIndex != -1;
	}

	remove(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const nodeIndex = bucket.findByKey(key);

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

	keys() {
		let result = [];

		// these are close to O(n²), ouch.
		this._buckets.forEach((bucket) => {
			if (bucket != null) result.push(bucket.getKeys());
		});

		return result.flat();
	}

	values() {
		let result = [];

		this._buckets.forEach((bucket) => {
			if (bucket != null) result.push(bucket.getValues());
		});

		return result.flat();
	}

	entries() {
		let result = [];

		this._buckets.forEach((bucket) => {
			if (bucket != null) result.push(bucket.getPairs());
		});

		return result.flat();
	}
}

export { HashMap };
