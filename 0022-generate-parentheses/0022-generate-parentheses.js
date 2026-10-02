var generateParenthesis = function(n) {
    let result = [];

    function backtrack(current, open, close) {

        // If we have used n pairs, store the answer
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // We can add '(' if we still have some left
        if (open < n) {
            backtrack(current + "(", open + 1, close);
        }

        // We can add ')' only if there is an unmatched '('
        if (close < open) {
            backtrack(current + ")", open, close + 1);
        }
    }

    backtrack("", 0, 0);

    return result;
};