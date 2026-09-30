var maxDepthAfterSplit = function(seq) {
    let ans = [];
    let depth = 0;

    for (let ch of seq) {
        if (ch === '(') {
            depth++;

            if (depth % 2 === 1) {
                ans.push(0);
            } else {
                ans.push(1);
            }
        } else {
            if (depth % 2 === 1) {
                ans.push(0);
            } else {
                ans.push(1);
            }

            depth--;
        }
    }

    return ans;
};