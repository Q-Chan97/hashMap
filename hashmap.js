import { LinkedList } from "./linkedLists.js";

export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0; // Keep track of size 
        this.buckets = new Array(this.capacity); // Buckets will be an array of our capacity
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            // Modulo entire hash, still is able to map to buckets
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if ((this.size + 1) / this.capacity > this.loadFactor) { // If size gets too big, triggers resize
            this.resize();
        }

        let index = this.hash(key);

        if (!this.buckets[index]) { // If index is empty, set value to be passed in value
            let list = new LinkedList(); // Creates linked list as bucket
            list.append({key, value}); // Appends object to linked list
            this.buckets[index] = list; // Adds the linked list to buckets array
            this.size++; // Increase size
            console.log(list);
            return;
        }

        let current = this.buckets[index].head; // Targets head node of linked list

        while (current) {
            if (current.value.key === key) { // If there's a key match in the object
                current.value.value = value; // Overwrites value
                return;
            }
            current = current.nextNode; // Advances through list
        }

        // Case for no key found
        this.buckets[index].append({key, value}); // Appends key and value to bucket
        this.size++;
    }

    get(key) {
        const index = this.hash(key); // Get index

        if (!this.buckets[index]) { // Guard if no bucket exists
            return null;
        }

        let current = this.buckets[index].head; // Start at head of bucket

        while (current) {
            if (current.value.key === key) {
                console.log(current.value.value);
                return current.value.value;
            } 
            current = current.nextNode;
        }
    }

    has(key) {
        const index = this.hash(key); // Get index

        if (!this.buckets[index]) { // Guard if no bucket exists
            return false;
        }

        let current = this.buckets[index].head; // Start at head of bucket

        while (current) {
            if (current.value.key === key) {
                console.log("It's there!")
                return true;
            } 
            current = current.nextNode;
        } 
        console.log("Not there...");
        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (!this.buckets[index]) return false; // Returns false if index doesn't exist

        let current = this.buckets[index].head; // Current starts at head
        let previous = null; // Previous starts at null

        while (current) {
            if (current.value.key === key) {

                this.size--; // If key exists, will reduce size

                if (previous === null) { // If it's the head node
                    this.buckets[index].head = current.nextNode; // New head becomes the next node in Linked List
                    if (!this.buckets[index].head) { // If list is empty, clears index
                        this.buckets[index] = undefined; 
                    }
                    return true;
                } 

                else { // Middle or tail removal
                    previous.nextNode = current.nextNode; // Links previous node to next node

                    if (current === this.buckets[index].tail) { // If the current node was the tail
                        this.buckets[index].tail = previous; // Sets the tail to be previous
                    }
                    return true;
                }
            }
            previous = current; // Switches current to be previous. These fire while current exists, but until current value finds key
            current = current.nextNode; // Switches current to the next node
        }
        return false; // Returns false after search too
    }

    length() {
        return this.size; // Returns size of array
    }

    clear() {
        this.buckets = new Array(this.capacity); // Make buckets into a fresh array
        this.size = 0; // Reset size to 0
    }

    keys() {
        let keys = []; // Array to hold keys

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) { // If a bucket is found

                let current = this.buckets[i].head; // Start at head

                while (current) { // Traverse nodes in linked list
                    keys.push(current.value.key); // Add the key to the keys array
                    current = current.nextNode; // Advance through linked list
                }
            }
        }
        return keys; // Return array
    }

    values() {
        let values = []; // Array to hold values

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) { // If a bucket is found

                let current = this.buckets[i].head; // Start at head

                while (current) { // Traverse nodes in linked list
                    values.push(current.value.value); // Add the value to the values array
                    current = current.nextNode; // Advance through linked list
                }
            }
        }
        return values; // Return array
    }

    entries() {
        let entries = []; // Array to hold entries

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) { // If a bucket is found

                let current = this.buckets[i].head; // Start at head

                while (current) { // Traverse nodes in linked list
                    entries.push(current.value); // Add the object to entries array
                    current = current.nextNode; // Advance through linked list
                }
            }
        }
        return entries; // Return array
    }

    resize() {
        let oldBuckets = this.buckets; // Capture old buckets

        this.capacity *= 2; // Double capacity
        this.size = 0; // Reset size to 0
        this.buckets = new Array(this.capacity); // Make new array with new capacity

        for (let i = 0; i < oldBuckets.length; i++) {
            if (!oldBuckets[i]) continue; // Skips empty buckets

            let current = oldBuckets[i].head; // Target start of node in old buckets

            while (current) {
                this.set(current.value.key, current.value.value); // Adds old buckets back into new array
                current = current.nextNode; // Moves through each bucket node
            }
        }
    }
}