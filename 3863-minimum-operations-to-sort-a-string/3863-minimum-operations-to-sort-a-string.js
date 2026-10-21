/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
    const n = s.length;

    // 0 operations if already sorted
    let sorted = true;
    for (let i = 1; i < n; i++) {
        if (s[i] < s[i - 1]) { sorted = false; break; }
    }
    if (sorted) return 0;

    // Length 2 and unsorted: the only allowed substrings have length 1
    if (n === 2) return -1;

    let mn = 'z', mx = 'a';
    for (const c of s) {
        if (c < mn) mn = c;
        if (c > mx) mx = c;
    }

    // 1 operation: first char is the minimum (sort s[1..]),
    // or last char is the maximum (sort s[0..n-2])
    if (s[0] === mn || s[n - 1] === mx) return 1;

    // 3 operations: the only max sits at index 0 AND the only min sits at the end
    // (e.g. "cba")
    let cntMn = 0, cntMx = 0;
    for (const c of s) {
        if (c === mn) cntMn++;
        if (c === mx) cntMx++;
    }
    if (s[0] === mx && cntMx === 1 && s[n - 1] === mn && cntMn === 1) return 3;

    // Otherwise 2 operations are enough
    return 2;
};
