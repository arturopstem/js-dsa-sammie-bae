function linearSearch(array, n) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === n) {
      return true;
    }
  }
  return false;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 6));
console.log(linearSearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 10));

function binarySearch(array, n) {
  let lowIndex = 0;
  let highIndex = array.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2);
    if (array[midIndex] === n) {
      return midIndex;
    }
    if (n > array[midIndex]) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4], 4));
console.log(binarySearch([1, 2, 3, 4], 5));

// SWAP Helper function
function swap(_array, index1, index2) {
  const array = _array;
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// BUBBLE SORT
function bubbleSort(array) {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j <= i; j += 1) {
      if (array[i] < array[j]) {
        swap(array, i, j);
      }
    }
  }
  return array;
}

console.log(bubbleSort([6, 1, 2, 3, 4, 5]));

// SELECTION SORT
function selectionSort(items) {
  const len = items.length;
  let min;
  for (let i = 0; i < len; i += 1) {
    // set minimum to this position
    min = i;
    // check the rest of the array to see if anything is smaller
    for (let j = i + 1; j < len; j += 1) {
      if (items[j] < items[min]) {
        min = j;
      }
    }
    // if the minimum isn't in the position, swap it
    if (i !== min) {
      swap(items, i, min);
    }
  }
  return items;
}

console.log(selectionSort([6, 1, 23, 4, 2, 3]));

// INSERTION SORT
function insertionSort(_items) {
  const items = _items;
  const len = items.length; // number of items in the array
  let value; // the value currently being compared
  let i; // index into unsorted section
  let j; // index into sorted section

  for (i = 0; i < len; i += 1) {
    // store the current value because it may shift later
    value = items[i];

    // Whenever the value in the sorted section is greater than the value
    // in the unsorted section, shift all items in the sorted section
    // over by one. This creates space in which to insert the value
    for (j = i - 1; j > -1 && items[j] > value; j -= 1) {
      items[j + 1] = items[j];
    }
    items[j + 1] = value;
  }
  return items;
}

console.log(insertionSort([5, 1, 23, 4, 2, 3]));

// QUICKSORT
function partition(_array, _left, _right) {
  const array = _array;
  let left = _left;
  let right = _right;

  const pivot = array[Math.floor((right + left) / 2)];
  while (left <= right) {
    while (pivot > array[left]) {
      left += 1;
    }
    while (pivot < array[right]) {
      right -= 1;
    }
    if (left <= right) {
      const temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      left += 1;
      right -= 1;
    }
  }
  return left;
}

function quickSortHelper(items, left, right) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right);
  }
  if (left < index - 1) {
    quickSortHelper(items, left, index - 1);
  }
  if (index < right) {
    quickSortHelper(items, index, right);
  }
  return items;
}

function quickSort(items) {
  return quickSortHelper(items, 0, items.length - 1);
}

console.log(quickSort([6, 1, 23, 4, 2, 3]));

// QUICKSELECT
const qsArray = [1, 3, 3, -2, 3, 14, 7, 8, 1, 2, 2];
// sorted form = [-2, 1, 1, 2, 2, 3, 3, 3, 7,8, 14]
function quickSelectInPlace(A, l, h, k) {
  const p = partition(A, l, h);
  if (p === k - 1) {
    return A[p];
  }
  if (p > k - 1) {
    return quickSelectInPlace(A, l, p - 1, k);
  }
  return quickSelectInPlace(A, p + 1, h, k);
}

function medianQuickselect(array) {
  return quickSelectInPlace(
    array,
    0,
    array.length - 1,
    Math.floor(array.length / 2),
  );
}

console.log(quickSelectInPlace(qsArray, 0, qsArray.length - 1, 5)); // 2
// 2 - because it's the fifth smallest element
console.log(quickSelectInPlace(qsArray, 0, qsArray.length - 1, 10)); // 7
// 7 - because it's the tenth smallest element

// MERGESORT
function merge(leftA, rightA) {
  const results = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftA.length && rightIndex < rightA.length) {
    if (leftA[leftIndex] < rightA[rightIndex]) {
      results.push(leftA[leftIndex]);
      leftIndex += 1;
    } else {
      results.push(rightA[rightIndex]);
      rightIndex += 1;
    }
  }
  const letfRemains = leftA.slice(leftIndex);
  const rightRemains = rightA.slice(rightIndex);

  return results.concat(letfRemains).concat(rightRemains);
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const midpoint = Math.floor(array.length / 2);
  const leftArray = array.slice(0, midpoint);
  const rightArray = array.slice(midpoint);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

console.log(mergeSort([6, 1, 23, 4, 2, 3]));

// COUNT SORT
function countSort(array) {
  const hash = {};
  const countArr = [];
  for (let i = 0; i < array.length; i += 1) {
    if (!Object.hasOwn(hash, array[i])) {
      hash[array[i]] = 1;
    } else {
      hash[array[i]] += 1;
    }
  }
  const keys = Object.keys(hash);
  console.log(keys);
  keys.forEach((key) => {
    const integer = Number.parseInt(key, 10);
    // for any number of _ element, add it to array
    const numberOfElements = hash[key];
    for (let i = 0; i < numberOfElements; i += 1) {
      countArr.push(integer);
    }
  });

  return countArr;
}

console.log(
  countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 2, 3]),
);

/* -------------------------------------------------------------------------- */
/*                                  EXERCISES                                 */
/* -------------------------------------------------------------------------- */

// IMPLEMENT SQUARE ROOT FUNCTION FOR AN INTEGER WITHOUT USING ANY MATH LIBRARY
function sqrtIntNaive(number) {
  if (number === 0 || number === 1) {
    return number;
  }

  let index = 1;
  let square = 1;
  while (square < number) {
    if (square === number) {
      return square;
    }

    index += 1;
    square = index * index;
  }
  return index;
}

console.log(sqrtIntNaive(25));

// Sqrt Int
function sqrtInt(number) {
  if (number === 0 || number === 1) return number;

  let start = 1;
  let end = number;
  let ans;

  while (start <= end) {
    const mid = parseInt((start + end) / 2, 10);
    if (mid * mid === number) return mid;
    if (mid * mid < number) {
      start = mid + 1;
      ans = mid;
    } else {
      end = mid - 1;
    }
  }
  return ans;
}

console.log(sqrtInt(10));

function sqrtDouble(number) {
  const threshold = 0.1;
  // 9 try middle
  let upper = number;
  let lower = 0;
  let middle;
  while (upper - lower > threshold) {
    middle = (upper + lower) / 2;
    if (middle * middle > number) {
      upper = middle;
    } else {
      lower = middle;
    }
  }
  return middle;
}

console.log(sqrtDouble(10));

// FIND IF TWO ELEMENTS OF AN ARRAY ADD UP TO A GIVEN NUMBER
function findTwoSumOn2(array, sum) {
  const len = array.length;
  for (let i = 0; i < len; i += 1) {
    for (let j = 0; j < len; j += 1) {
      console.log([array[i], array[j]]);
      if (j !== i && array[i] + array[j] === sum) {
        return true;
      }
    }
  }
  return false;
}

function findTwoSum(array, sum) {
  const store = {};
  const len = array.length;
  for (let i = 0; i < len; i += 1) {
    if (store[array[i]]) {
      return true;
    }
    store[sum - array[i]] = array[i];
  }
  return false;
}

// FIND AN ELEMENT WITHTIN AN ARRAY THAT APPEARS ONLY ONCE
function findOnlyOnceHelper(arr, low, high) {
  if (low > high) {
    return null;
  }
  if (low === high) {
    return arr[low];
  }
  const mid = Math.floor((high + low) / 2);

  if (mid % 2 === 0) {
    if (arr[mid] === arr[mid + 1]) {
      return findOnlyOnceHelper(arr, mid + 2, high);
    }
    return findOnlyOnceHelper(arr, low, mid);
  }
  if (arr[mid] === arr[mid - 1]) {
    return findOnlyOnceHelper(arr, mid + 1, high);
  }
  return findOnlyOnceHelper(arr, low, mid - 1);
}

function findOnlyOnce(arr) {
  return findOnlyOnceHelper(arr, 0, arr.length);
}

console.log(findOnlyOnce([1, 1, 2, 4, 4, 5, 5, 6, 6]));

// IMPLEMENT A WORD COUNTER LIST
function wordCount(sentence) {
  const ocurrenceList = {};
  const answerList = {};

  const allWords = sentence.match(/[a-zA-Z]+/g);

  allWords.forEach((word) => {
    if (!ocurrenceList[word]) {
      ocurrenceList[word] = 1;
    } else {
      ocurrenceList[word] += 1;
    }
  });

  const uniqueWordsArray = Object.keys(ocurrenceList);
  uniqueWordsArray.sort((a, b) => ocurrenceList[b] - ocurrenceList[a]);

  uniqueWordsArray.forEach((word) => {
    answerList[word] = ocurrenceList[word];
  });

  return answerList;
}

const exampleImput =
  'practice makes perfect. get perfect by practice. just practice';
console.log(wordCount(exampleImput));
