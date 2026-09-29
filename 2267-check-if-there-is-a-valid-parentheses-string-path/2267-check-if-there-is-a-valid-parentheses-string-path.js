var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Path length must be even
    if ((m + n - 1) % 2 !== 0) {
        return false;
    }

    // Must start with '(' and end with ')'
    if (grid[0][0] !== '(' || grid[m - 1][n - 1] !== ')') {
        return false;
    }

    const memo = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Map())
    );

    function dfs(r, c, balance) {
        // Process current cell
        if (grid[r][c] === '(') {
            balance++;
        } else {
            balance--;
        }

        // Invalid prefix
        if (balance < 0) {
            return false;
        }

        // Number of cells remaining after current cell
        const remaining = (m - 1 - r) + (n - 1 - c);

        // Even if all remaining cells are ')',
        // we need enough cells to close the brackets.
        if (balance > remaining) {
            return false;
        }

        // Destination
        if (r === m - 1 && c === n - 1) {
            return balance === 0;
        }

        // Memoization
        if (memo[r][c].has(balance)) {
            return memo[r][c].get(balance);
        }

        // Move down
        if (r + 1 < m && dfs(r + 1, c, balance)) {
            memo[r][c].set(balance, true);
            return true;
        }

        // Move right
        if (c + 1 < n && dfs(r, c + 1, balance)) {
            memo[r][c].set(balance, true);
            return true;
        }

        memo[r][c].set(balance, false);
        return false;
    }

    return dfs(0, 0, 0);
};