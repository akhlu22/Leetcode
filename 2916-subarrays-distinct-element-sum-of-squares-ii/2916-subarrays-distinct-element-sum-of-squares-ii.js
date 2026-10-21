
var sumCounts = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;

    const sum = new Array(4 * n).fill(0);
    const sq = new Array(4 * n).fill(0);
    const lazy = new Array(4 * n).fill(0);

    function apply(node, left, right, val) {
        const len = right - left + 1;

        sq[node] = (
            sq[node] +
            2 * val * sum[node] +
            val * val * len
        ) % MOD;

        sum[node] = (sum[node] + val * len) % MOD;
        lazy[node] += val;
    }

    function push(node, left, right) {
        if (lazy[node] === 0 || left === right) return;

        const mid = Math.floor((left + right) / 2);
        const val = lazy[node];

        apply(node * 2, left, mid, val);
        apply(node * 2 + 1, mid + 1, right, val);

        lazy[node] = 0;
    }

    function update(node, left, right, ql, qr) {
        if (ql > right || qr < left) return;

        if (ql <= left && right <= qr) {
            apply(node, left, right, 1);
            return;
        }

        push(node, left, right);

        const mid = Math.floor((left + right) / 2);

        update(node * 2, left, mid, ql, qr);
        update(node * 2 + 1, mid + 1, right, ql, qr);

        sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;
        sq[node] = (sq[node * 2] + sq[node * 2 + 1]) % MOD;
    }

    const last = new Map();
    let answer = 0;

    for (let i = 0; i < n; i++) {
        const previous = last.has(nums[i])
            ? last.get(nums[i])
            : -1;

        if (previous + 1 <= i) {
            update(1, 0, n - 1, previous + 1, i);
        }

        last.set(nums[i], i);
        answer = (answer + sq[1]) % MOD;
    }

    return answer;
};
