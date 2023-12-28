// Iterative solution: Fibonacci Sequence
// function getNthFibo(n) {
//   let [a, b] = [0, 1];
//   let num;
//   for (let i = 0; i <= n; i += 1) {
//     num = a;
//     [a, b] = [b, a + b];
//   }

//   return num;
// }

// Fibonacci Sequence: Tail Recursion
function getNthFiboBetter(n, lastLast, last) {
  if (n === 0) {
    return lastLast;
  }
  if (n === 1) {
    return last;
  }
  return getNthFiboBetter(n - 1, last, lastLast + last);
}

function getNthFibo(n) {
  return getNthFiboBetter(n, 0, 1);
}

console.log(getNthFibo(5));

// Pascal Triangle
function pascalTriangle(row, col) {
  console.table('Turn', row, col);
  if (col === 0) {
    return 1;
  }
  if (row === 0) {
    return 0;
  }
  return pascalTriangle(row - 1, col) + pascalTriangle(row - 1, col - 1);
}

console.log(pascalTriangle(5, 2));

/* -------------------------------------------------------------------------- */
/*                                  EXERCISES                                 */
/* -------------------------------------------------------------------------- */
// CONVERT DECIMAL (BASE 10) TO BINARY NUMBER
function decimalToBinary(n) {
  if (n < 2) {
    return n.toString();
  }
  const remainder = n % 2;
  const quotient = Math.floor(n / 2);
  return decimalToBinary(quotient) + remainder;
}

console.log(decimalToBinary(232));

// PRINT ALL PERMUTATIONS OF AN ARRAY
function swap(_strArr, index1, index2) {
  const strArr = _strArr;
  [strArr[index1], strArr[index2]] = [strArr[index2], strArr[index1]];
}

function permute(permSet, strArr, begin, end) {
  if (begin === end) {
    permSet.push([...strArr]);
  } else {
    for (let i = begin; i < end + 1; i += 1) {
      swap(strArr, begin, i);
      permute(permSet, strArr, begin + 1, end);
      swap(strArr, begin, i);
    }
  }
}

function permuteArray(strArr) {
  const permSet = [];
  permute(permSet, strArr, 0, strArr.length - 1);
  return permSet;
}

const myArray = ['A', 'B', 'C'];
console.table(permuteArray(myArray));

// FLATTEN AN OBJECT
function isObject(obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function recursiveFO(_flattened, value, parent = '') {
  const flattened = _flattened;
  if (!isObject(value)) {
    flattened[parent] = value;
    return;
  }
  const keys = Object.keys(value);
  keys.forEach((key) => {
    recursiveFO(flattened, value[key], `${parent}${parent ? '.' : ''}${key}`);
  });
}

function flattenObject(obj) {
  const flattened = {};

  recursiveFO(flattened, obj);
  return flattened;
}

const dictionary = {
  Key1: '1',
  Key2: {
    a: '2',
    b: '3',
    c: {
      d: '3',
      e: '1',
    },
  },
};
console.log(flattenObject(dictionary));

// DETERMINE IF A STRING IS PALINDROME
function isPalindromeRF(word, leftPos, rightPos) {
  if (leftPos >= rightPos) {
    return true;
  }
  if (word.at(leftPos) !== word.at(rightPos)) {
    return false;
  }
  return isPalindromeRF(word, leftPos + 1, rightPos - 1);
}

function isPalindrome(word) {
  return isPalindromeRF(word, 0, word.length - 1);
}

console.log(isPalindrome('hi'));
console.log(isPalindrome('iii'));
console.log(isPalindrome('ii'));
console.log(isPalindrome('aibohphobia'));
console.log(isPalindrome('racecar'));
