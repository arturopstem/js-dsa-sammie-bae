function intersectSets(setA, setB) {
  const intersection = new Set();
  const [small, big] = setA.size < setB.size ? [setA, setB] : [setB, setA];
  small.forEach((x) => {
    if (big.has(x)) intersection.delete(x);
  });
  return intersection;
}

function isSuperset(setA, subset) {
  if (setA.size < subset.size) return false;
  const values = Array.from(subset);
  return values.every((x) => setA.has(x));
}

function unionSet(setA, setB) {
  const [small, big] = setA.size < setB.size ? [setA, setB] : [setB, setA];
  const union = new Set(big);
  small.forEach((x) => union.add(x));
  return union;
}

function differenceSet(setA, setB) {
  const difference = new Set(setA);
  setB.forEach((x) => difference.delete(x));
  return difference;
}

/* -------------------------------------------------------------------------- */
/*                                  EXERCISES                                 */
/* -------------------------------------------------------------------------- */
// CHECK FOR DUPLICATES IN AN ARRAY
function checkDuplicates(arr) {
  const setFromArray = new Set(arr);
  return setFromArray.size < arr.length;
}

// UNIQUE VALUES FROM SEPARATE ARRAYS
function uniqueList(arr1, arr2) {
  const uniqueSet = new Set(arr1.concat(arr2));
  return Array.from(uniqueSet);
}
