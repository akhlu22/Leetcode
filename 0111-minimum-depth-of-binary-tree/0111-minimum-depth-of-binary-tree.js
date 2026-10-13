
var minDepth = function(root) {
    if (root === null) {
        return 0;
    }

    // If there is no left child, go right
    if (root.left === null) {
        return 1 + minDepth(root.right);
    }

    // If there is no right child, go left
    if (root.right === null) {
        return 1 + minDepth(root.left);
    }

    // Both children exist: choose the smaller depth
    return 1 + Math.min(
        minDepth(root.left),
        minDepth(root.right)
    );
};
