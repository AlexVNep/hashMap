class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucketLimit = this.capacity * this.loadFactor;
    const currentBucket = this.buckets[index];

    if (this.length() > bucketLimit) {
      this.capacity *= 2;
    }

    if (this.buckets[index] == null) {
      this.buckets[index] = [{ key, value }];
    } else {
      if (this.buckets[index].some((item) => item.key === key)) {
        // If the key already exists, update its value
        this.buckets[index].find((item) => item.key === key).value = value;
      } else {
        // If the key doesn't exist, add it to the array at the current bucket
        this.buckets[index].push({ key, value });
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return null;
    }
    const found = this.buckets[index].find((pair) => pair.key === key);
    if (found) {
      return found.value; // Assuming your structure has a value.value property
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return false;
    }
    const found = this.buckets[index].find((pair) => pair.key === key);
    if (found) {
      return true; // Assuming your structure has a value.value property
    }
  }

  remove(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return false;
    }
    const indexOfPair = this.buckets[index].findIndex(
      (pair) => pair.key === key
    );

    if (indexOfPair !== -1) {
      this.buckets[index].splice(indexOfPair, 1);
      return true;
    }

    return false;
  }

  length() {
    let count = 0;

    //check each bucket for node.
    for (let i = 0; i < this.capacity; i++) {
      let currentNode = this.buckets[i];

      if (currentNode != null) {
        //check if bucket has multiple nodes.
        while (currentNode != null) {
          count++;
          currentNode = currentNode.nextNode;
        }
      }
    }

    return count;
  }
}

const test = new HashMap();

console.log(test.buckets);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("rat", "grey");
// console.log(test.entry());
// console.log(test.get("apple"));
// console.log(test.hash("banana"));
// console.log(test.hash("rat"));
console.log(test.buckets);
console.log(test.length());
console.log(test.buckets);
