class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
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
}

let hash = new HashMap;
console.log(hash.hash("Frank"));