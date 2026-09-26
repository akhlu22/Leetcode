var deleteDuplicates = function(head) {
    let current = head;

    while (current !== null && current.next !== null) {
        if (current.val === current.next.val) {
            // Skip the duplicate node
            current.next = current.next.next;
        } else {
            // Move to the next node
            current = current.next;
        }
    }

    return head;
};