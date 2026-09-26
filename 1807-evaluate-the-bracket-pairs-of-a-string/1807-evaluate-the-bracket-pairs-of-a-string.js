var evaluate = function(s, knowledge) {
    // Create a Map for quick lookup
    let map = new Map();

    for (let [key, value] of knowledge) {
        map.set(key, value);
    }

    // Replace every (key)
    return s.replace(/\(([a-z]+)\)/g, function(match, key) {
        return map.has(key) ? map.get(key) : "?";
    });
};