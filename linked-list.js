class Node {
	constructor(val = null, next = null) {
		this.val = val;
		this.next = next;
	}
}

class LinkedList {
	constructor() {
		this._head = null;
		this._tail = null;
	}

	append(val) {
		const node = new Node(val);
		if (this._head == null && this._tail == null) {
			this._head = node;
			this._tail = node;
			return;
		}

		this._tail.next = node;
		this._tail = node;
	}

	prepend(val) {
		const node = new Node(val);
		if (this._head == null && this._tail == null) {
			this._head = node;
			this._tail = node;
			return;
		}

		node.next = this._head;
		this._head = node;
	}

	size() {
		let current = this._head;
		let numOfNodes = 0;

		// this way of traversal is used throughout the class.
		while (current != null) {
			numOfNodes++;
			current = current.next;
		}

		return numOfNodes;
	}

	head() {
		return this._head;
	}

	tail() {
		return this._tail;
	}

	at(index) {
		let current = this._head;
		let currentIndex = 0;

		while (current != null) {
			if (currentIndex == index) return current;
			current = current.next;
			currentIndex++;
		}

		return null;
	}

	pop() {
		if (this._tail == null) {
			console.warn("Tried to pop tail when it's already null!");
			return null;
		}

		let current = this._head;

		// keep moving until you reach the node that's just before the tail.
		while (current.next != this._tail) {
			current = current.next;
		}

		// current is now the node that's just before the tail.
		const poppedNode = this._tail;
		current.next = null;
		this._tail = current;

		return poppedNode;
	}

	contains(target) {
		let current = this._head;

		while (current != null) {
			if (current.val === target) return true;
			current = current.next;
		}

		// moved through entire list and didn't find target.
		return false;
	}

	containsKey(key) {
		let current = this._head;

		while (current != null) {
			if (current.val.key === key) return true;
			current = current.next;
		}

		// moved through entire list and didn't find target.
		return false;
	}

	find(target) {
		let current = this._head;
		let currentIndex = 0;

		while (current != null) {
			if (current.val === target) return currentIndex;
			current = current.next;
			currentIndex++;
		}

		// moved through entire list and didn't find target.
		return -1;
	}

	findByKey(key) {
		let current = this._head;
		let currentIndex = 0;

		while (current != null) {
			if (current.val.key === key) return currentIndex;
			current = current.next;
			currentIndex++;
		}

		// moved through entire list and didn't find target.
		return -1;
	}

	toString() {
		let current = this._head;
		let str = "";

		while (current != null) {
			str += `( ${current.val} ) -> `;
			current = current.next;
		}

		// last node always points to null, so add it to str
		str += "null";

		return str;
	}

	insertAt(val, index) {
		// insert at head
		if (index == 0) {
			this.prepend(val);
			return;
		}

		// else if index is not at head
		let current = this._head.next;
		let prev = this._head; // keep track of previous node
		let currentIndex = 1;

		while (current != null) {
			if (currentIndex == index) {
				const node = new Node(val);

				// add new node between current and prev nodes
				prev.next = node;
				node.next = current;

				return;
			}
			prev = current;
			current = current.next;
			currentIndex++;
		}

		console.warn("Warning: Tried to insert at invalid index");
	}

	removeAt(index) {
		// remove head
		if (index == 0) {
			if (this._head == null) {
				console.warn("Tried to remove head when it's already null!");
				return null;
			}

			const removed = this._head;
			this._head = this._head.next;

			return removed;
		}

		// else if index is not at head
		let current = this._head.next;
		let prev = this._head;
		let currentIndex = 1;

		while (current != null) {
			if (currentIndex == index) {
				prev.next = current.next;
				return current;
			}
			prev = current;
			current = current.next;
			currentIndex++;
		}

		console.warn("Warning: Tried to remove at invalid index");
		return null;
	}
}

export { Node, LinkedList };
