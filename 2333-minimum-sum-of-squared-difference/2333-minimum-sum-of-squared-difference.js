
var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    let diff = nums1.map((num, i) => Math.abs(num - nums2[i]));
    let k = k1 + k2;

    let maxDiff = Math.max(...diff);
    let low = 0, high = maxDiff;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        let operations = 0;

        for (let d of diff) {
            if (d > mid) {
                operations += d - mid;
            }
        }

        if (operations <= k) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    let limit = low;
    let operations = 0;

    for (let d of diff) {
        if (d > limit) {
            operations += d - limit;
        }
    }

    let remaining = k - operations;

    let result = 0;

    for (let d of diff) {
        let reduced = Math.min(d, limit);
        result += reduced * reduced;
    }

    // Use remaining operations to reduce values equal to limit by 1
    for (let d of diff) {
        if (remaining > 0 && d >= limit && limit > 0) {
            result -= limit * limit - (limit - 1) * (limit - 1);
            remaining--;
        }
    }

    return result;
};
