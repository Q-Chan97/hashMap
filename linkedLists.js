class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    toString() {
        let current = this.head;
        let string = "";

        while (current !== null) {
            string+=`(${current.value}) -> `;
            current = current.nextNode;
        }

        if (current === null) {
            string += "null";
        }
        return string;
    }

    append(value) {
        let newNode = new Node(value);

        if (this.size === 0) {
            this.head = newNode; // Both head and tail are the same node in a new list
            this.tail = newNode;
        } else {
            this.tail.nextNode = newNode; // Connect previous tail
            this.tail = newNode; // Actually adds new node as tail
        }
        this.size++; // Increase list size
    }

    prepend(value) {
        let newNode = new Node(value);

        if (this.size === 0) { // If list size is 0, operates the same way as append method
            this.head = newNode; 
            this.tail = newNode;
        } else {
            newNode.nextNode = this.head; // Connects old head 
            this.head = newNode; // Add new node as head
        }
        this.size++; // Increase list size
    }

    at(index) {
        if (index < 0 || index >= this.size) return null; // Guard in case index size doesn't exist

        let counter = 0;
        let current = this.head; // Starts counting at the head node

        while (counter < index) { // Only goes up to index passed in
            current = current.nextNode; // Advances through list
            counter++; // Increase counter up to index
        }

        return current; // Returns data
    }

    pop() {
        let current = this.head;

        if (this.size === 0) { // Return null for empty list
            return null;
        }

        if (this.size === 1) { // Removes node in a one node list
            let removedNode = this.head; // Captures head node before removal
            this.head = null;
            this.tail = null;
            this.size--; // Reduce size of list to 0
            return removedNode; // Returns removed node
        } else {
            while (current.nextNode !== this.tail) {
                current = current.nextNode;
            } 

            let removedNode = this.tail; // Captures last node in list
            this.tail = current; // New tail is current node
            this.tail.nextNode = null; // Set tail's next node to be null;
            this.size--; // Reduce size of list by 1

            return removedNode; // Returns removed node
        }
    }

    contains(value) {
        let current = this.head; // Start at head

        while (current !== null) {
            if (current.value === value) return true; // Returns true if the value of current node matches

            current = current.nextNode; // Advance through list
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let counter = 0; // "Index" counter

        while (current !== null) {
            if (current.value === value) return counter; // Return index number if found

            current = current.nextNode; // Advance to next node
            counter++; // Update counter
        }
        return null; // Returns null if nothing found
    }

    insertAt(index, value) {
        if (index < 0 || index > this.size) return null; // Similar guard as in at(index) method; won't insert anything
        if (index === 0) {
            this.prepend(value); // If the index is the first, prepends the node
            return; // Stops method
        }
        if (index === this.size) {
            this.append(value); // If the index is the tail, appends the node
            return; // Stops method
        }

        let current = this.head;
        let counter = 0;

        while (counter < index - 1) { // Traverses list to target the "index" before the one we want inserted
            current = current.nextNode;
            counter++;
        }

        let newNode = new Node(value); // Creates new node
        newNode.nextNode = current.nextNode; // New node takes the place of current node
        current.nextNode = newNode; // Links old node to new node. The next node of current (the one before our index) is our new node
        this.size++; // Increase the size of the list
    }

    remove(index) {
        if (index < 0 || index >= this.size) return null;

        if (index === 0) { // If the head is targeted
            let removedNode = this.head; // Captures head
            this.head = this.head.nextNode; // Sets the node after head to be the new head node
            this.size--; // Reduce size of list
            if (this.size === 0) this.tail = null; // Tail points to null, not removed node
            return removedNode; // Return removed head node
        }

        let current = this.head;
        let counter = 0;
        
        while (counter < index - 1) {
            current = current.nextNode;
            counter ++;
        }

        let removedNode = current.nextNode; // Captures node to remove
        current.nextNode = removedNode.nextNode; // Sets the node after removed node to be the next node
        if (index === this.size - 1) this.tail = current; // Tail points to new tail node
        this.size--; // Reduce size of list
        return removedNode; // Return removed node
    }
}