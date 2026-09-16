var isValid = function(s) {
    let stack = [];

    for (let ch of s) {

        if (ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        } 
        else {
            let top = stack.pop();

            if (
                (ch === ')' && top !== '(') ||
                (ch === '}' && top !== '{') ||
                (ch === ']' && top !== '[')
            ) {
                return false;
            }
        }
    }

    return stack.length === 0;
};