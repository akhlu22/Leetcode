/**
 * @param {string[]} board
 * @return {number[]}
 */
function pathsWithMaxScore(board) {
  const MOD = 1000000007;
  const n = board.length;

  // maxScore[i][j] = max score from (i,j) to S direction-reversed logic
  // Initialize with -1 meaning unreachable
  const maxScore = Array.from({ length: n }, () => Array(n).fill(-1));
  const ways = Array.from({ length: n }, () => Array(n).fill(0));

  // Start at S (bottom-right)
  maxScore[n - 1][n - 1] = 0;
  ways[n - 1][n - 1] = 1;

  // Traverse from bottom-right to top-left
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (board[i][j] === 'X') continue; // obstacle
      if (i === n - 1 && j === n - 1) continue; // S already initialized

      // Candidates: from down (i+1,j), right (i,j+1), down-right (i+1,j+1)
      // (reverse of up, left, up-left)
      const candidates = [];
      if (i + 1 < n && maxScore[i + 1][j] !== -1) candidates.push([maxScore[i + 1][j], ways[i + 1][j]]);
      if (j + 1 < n && maxScore[i][j + 1] !== -1) candidates.push([maxScore[i][j + 1], ways[i][j + 1]]);
      if (i + 1 < n && j + 1 < n && maxScore[i + 1][j + 1] !== -1) candidates.push([maxScore[i + 1][j + 1], ways[i + 1][j + 1]]);

      if (candidates.length === 0) continue; // unreachable

      let best = -1;
      for (const [sc] of candidates) best = Math.max(best, sc);

      let count = 0;
      for (const [sc, w] of candidates) {
        if (sc === best) count = (count + w) % MOD;
      }

      // Add current cell value if it's digit
      let add = 0;
      const ch = board[i][j];
      if (ch >= '0' && ch <= '9') add = ch.charCodeAt(0) - '0'.charCodeAt(0);

      maxScore[i][j] = best + add;
      ways[i][j] = count;
    }
  }

  // Top-left is E
  if (ways[0][0] === 0) return [0, 0];
  return [maxScore[0][0], ways[0][0]];
}