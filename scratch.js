var rotate = function(nums, k) {
    let spot = nums.length - (k % nums.length);
    let copy = [...nums.slice(spot), ...nums.slice(0, spot)]
    for(let i = 0; i < nums.length; i++) {
        nums[i] = copy[i];
    }
    // console.log(copy);
};

let nums = [1,2,3,4,5,6,7]
// [1, 2, 3, 4, 5, 6, 7]
// [5, 6, 7, 1, 2, 3, 4]
// k = 3

rotate(nums, 3)
console.log(nums)
