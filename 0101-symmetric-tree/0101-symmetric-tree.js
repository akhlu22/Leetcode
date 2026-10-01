var isSymmetric = function(root) {
    function isMirror(left, right) {
        // Both nodes are empty
        if (left === null && right === null) {
            return true;
        }

        // Only one node is empty
        if (left === null || right === null) {
            return false;
        }

        // Values are different
        if (left.val !== right.val) {
            return false;
        }

        // Compare opposite sides
        return (
            isMirror(left.left, right.right) &&
            isMirror(left.right, right.left)
        );
    }

    return isMirror(root.left, root.right);
};