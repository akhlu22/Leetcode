var sortedArrayToBST = function(nums) {

    function buildTree(left, right) {
        // No elements left
        if (left > right) {
            return null;
        }

        // Find middle element
        let mid = Math.floor((left + right) / 2);

        // Create root node
        let root = new TreeNode(nums[mid]);

        // Build left subtree
        root.left = buildTree(left, mid - 1);

        // Build right subtree
        root.right = buildTree(mid + 1, right);

        return root;
    }

    return buildTree(0, nums.length - 1);
};