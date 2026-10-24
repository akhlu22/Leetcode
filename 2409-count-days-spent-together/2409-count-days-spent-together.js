
var countDaysTogether = function(arriveAlice, leaveAlice, arriveBob, leaveBob) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function convertToDays(date) {
        const [month, day] = date.split("-").map(Number);
        let totalDays = day;

        for (let i = 0; i < month - 1; i++) {
            totalDays += daysInMonth[i];
        }

        return totalDays;
    }

    const start = Math.max(
        convertToDays(arriveAlice),
        convertToDays(arriveBob)
    );

    const end = Math.min(
        convertToDays(leaveAlice),
        convertToDays(leaveBob)
    );

    return Math.max(0, end - start + 1);
};
