
var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {

        // Skip non-alphanumeric characters
        if (!/[a-zA-Z0-9]/.test(s[left])) {
            left++;
            continue;
        }

        if (!/[a-zA-Z0-9]/.test(s[right])) {
            right--;
            continue;
        }

        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
};
