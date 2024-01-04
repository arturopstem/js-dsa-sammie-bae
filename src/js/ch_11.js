function HashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

// USING LINEAR PROBING
HashTable.prototype.put = function put(key, value) {
  if (this.limit >= this.size) throw new Error('hash table is full');

  let hashedIndex = this.hash(key);

  // Linear probing
  while (this.keys[hashedIndex] != null) {
    hashedIndex += 1;
    hashedIndex %= this.size;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit += 1;
};

HashTable.prototype.get = function get(key) {
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] !== key) {
    hashedIndex += 1;
    hashedIndex %= this.size;
  }

  return this.values[hashedIndex];
};

HashTable.prototype.hash = function hash(key) {
  // Check if int
  if (!Number.isInteger(key)) throw new Error('must be int');

  return key % this.size;
};

HashTable.prototype.initArray = function initArray(size) {
  const array = [];
  for (let i = 0; i < size; i += 1) {
    array.push(null);
  }

  return array;
};

// USING QUADRATIC PROBING
HashTable.prototype.put = function put(key, value) {
  if (this.limit >= this.size) throw new Error('hash table is full');

  let hashedIndex = this.hash(key);
  let squareIndex = 1;

  // quadratic probing
  while (this.keys[hashedIndex] != null) {
    hashedIndex += squareIndex ** 2;
    hashedIndex %= this.size;
    squareIndex += 1;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit += 1;
};

HashTable.prototype.get = function get(key) {
  let hashedIndex = this.hash(key);
  let squareIndex = 1;

  while (this.keys[hashedIndex] !== key) {
    hashedIndex += squareIndex ** 2;
    hashedIndex %= this.size;
    squareIndex += 1;
  }

  return this.values[hashedIndex];
};

// USING DOUBLE-HASHING WITH LINEAR PROBING
HashTable.prototype.put = function put(key, value) {
  if (this.limit >= this.size) throw new Error('hash table is full');

  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != null) {
    hashedIndex += 1;
    hashedIndex %= this.size;
  }

  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit += 1;
};

HashTable.prototype.get = function get(key) {
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] !== key) {
    hashedIndex += 1;
    hashedIndex %= this.size;
  }

  return this.values[hashedIndex];
};

HashTable.prototype.hash = function hash(key) {
  if (!Number.isInteger(key)) throw new Error('must be int');

  return this.secondHash(key % this.size);
};

HashTable.prototype.secondHash = function secondHash(hashedKey) {
  const R = this.size - 2;

  return R - (hashedKey % R);
};

const exampletable = new HashTable(13);

exampletable.put(7, 'hi');
exampletable.put(20, 'hello');
exampletable.put(33, 'sunny');
exampletable.put(46, 'weather');
exampletable.put(59, 'wow');
exampletable.put(72, 'forty');
exampletable.put(85, 'happy');
exampletable.put(98, 'sad');

console.table({ keys: exampletable.keys, values: exampletable.values });
