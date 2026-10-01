var isValid = function(s) {
    const stack = [];

    for (let ch of s) {

        // Opening brackets
        if (ch === '(' || ch === '[' || ch === '{') {
            stack.push(ch);
        }

        // Closing brackets
        else {
            if (stack.length === 0) {
                return false;
            }

            const top = stack.pop();

            if (
                (ch === ')' && top !== '(') ||
                (ch === ']' && top !== '[') ||
                (ch === '}' && top !== '{')
            ) {
                return false;
            }
        }
    }

    // Stack must be empty
    return stack.length === 0;
};