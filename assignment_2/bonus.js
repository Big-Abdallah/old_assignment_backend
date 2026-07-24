var findKthPositive = function (arr, k) {
  let current = 1;
  let index = 0;

  while (k > 0) {
    if (index < arr.length && arr[index] === current) {
      index++;
    } else {
      k--;

      if (k === 0) {
        return current;
      }
    }

    current++;
  }
};

console.log(findKthPositive([2, 3, 4, 7, 11], 5));
console.log(findKthPositive([1, 2, 3, 4], 2));