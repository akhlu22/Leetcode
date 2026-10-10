
var isBalanced = function(root) {
    function height(node) {
        if (node === null) {
            return 0;
        }

        let leftHeight = height(node.left);
        if (leftHeight === -1) return -1;

        let rightHeight = height(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    return height(root) !== -1;
};
