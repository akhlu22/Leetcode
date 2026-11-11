
var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    // Option 1: Buy both types separately
    let option1 = cost1 * need1 + cost2 * need2;

    // Option 2: Buy both items for the common requirement,
    // then buy the remaining items separately
    let common = Math.min(need1, need2);

    let option2 = common * costBoth
                + (need1 - common) * cost1
                + (need2 - common) * cost2;

    // Option 3: Buy only type 3 items
    let option3 = Math.max(need1, need2) * costBoth;

    return Math.min(option1, option2, option3);
};
