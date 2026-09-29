var inorderTraversal = function(root) {
    let result = [];

    function inorder(node) {
        if (node === null) {
            return;
        }

        // Left
        inorder(node.left);

        // Root
        result.push(node.val);

        // Right
        inorder(node.right);
    }

    inorder(root);

    return result;
};