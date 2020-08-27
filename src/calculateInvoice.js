const calculateTragedyAmount = (thisAmount, performance) => {
    thisAmount = 40000;
    if (performance.audience > 30) {
        thisAmount += 1000 * (performance.audience - 30);
    }
    return thisAmount;
}

const calculateComedyAmount = (thisAmount, performance) => {
    thisAmount = 30000;
    if (performance.audience > 20) {
        thisAmount += 10000 + 500 * (performance.audience - 20);
    }
    thisAmount += 300 * performance.audience;
    return thisAmount;
}

const calculateAmount = (play, performance) => {
    let thisAmount = 0;
    switch (play.type) {
        case 'tragedy':
            thisAmount = calculateTragedyAmount(thisAmount, performance);
            break;
        case 'comedy':
            thisAmount = calculateComedyAmount(thisAmount, performance);
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

const calculateVolumeCredits = (volumeCredits, performance, play) => {
    volumeCredits += Math.max(performance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(performance.audience / 5);
    return volumeCredits;
}

const calculateResult = (performances, plays) => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let tickets = performances.map(performance => {
        const play = plays[performance.playID];
        let thisAmount = calculateAmount(play, performance);
        // add volume credits
        volumeCredits = calculateVolumeCredits(volumeCredits, performance, play);
        //print line for this order
        totalAmount += thisAmount;
        return {
            "name": play.name,
            "amount": thisAmount / 100,
            "audience": performance.audience
        };
    })
    return {
        "tickets": tickets,
        "totalAmount": totalAmount,
        "volumeCredits": volumeCredits
    };
}

module.exports = {
    calculateResult
};