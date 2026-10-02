var maxDepth = function(root) {
    // If tree is empty
    if (root === null) {
        return 0;
    }

    // Find depth of left and right subtrees
    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);

    // Take the larger depth and add current node
    return 1 + Math.max(leftDepth, rightDepth);
};