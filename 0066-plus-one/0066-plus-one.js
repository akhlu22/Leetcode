var plusOne = function(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {

        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }

        // If digit is 9, it becomes 0
        digits[i] = 0;
    }

    // If every digit was 9
    digits.unshift(1);

    return digits;
};