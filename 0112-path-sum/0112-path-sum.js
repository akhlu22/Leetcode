
var hasPathSum = function(root, targetSum) {
    // If the tree is empty, no path exists
    if (root === null) {
        return false;
    }

    // Check if the current node is a leaf
    if (root.left === null && root.right === null) {
        return targetSum === root.val;
    }

    // Subtract current node's value and search children
    let remainingSum = targetSum - root.val;

    return (
        hasPathSum(root.left, remainingSum) ||
        hasPathSum(root.right, remainingSum)
    );
};
