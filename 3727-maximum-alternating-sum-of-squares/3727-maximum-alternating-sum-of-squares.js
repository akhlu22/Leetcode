
var maxAlternatingSum = function(nums) {
    nums.sort((a, b) => Math.abs(a) - Math.abs(b));

    let n = nums.length;
    let half = Math.floor(n / 2);
    let sum = 0;

    for (let i = 0; i < half; i++) {
        sum -= nums[i] * nums[i];
    }

    for (let i = half; i < n; i++) {
        sum += nums[i] * nums[i];
    }

    return sum;
};
