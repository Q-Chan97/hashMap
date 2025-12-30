import { LinkedList } from "./linkedLists.js";

class HashMap {
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
}