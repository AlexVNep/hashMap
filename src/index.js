class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
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
    console.log(this.length());

    if (this.length() > bucketLimit) {
      console.log(this.length());
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

  //   get(key) {
  //     const index = this.hash(key);

  //     if (this.buckets[index] == null) {
  //       console.log("first");
  //       return null;
  //     }
  //     console.log("second");
  //     return this.buckets[index];
  //   }

  length() {
    let counter = 0;
    this.buckets.forEach((bucket) => {
      if (bucket != null) {
        counter += 1;
      } else {
        counter += 0;
      }
    });
    return counter;
  }

  //   entry() {
  //     let allItems = [];
  //     this.buckets.map((bucket) => {
  //       allItems.push(bucket);
  //     });
  //     return allItems;
  //   }
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
// console.log(test.get("rat"));
