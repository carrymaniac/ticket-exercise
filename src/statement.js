function calculateTragedyAmount(thisAmount, perf) {
  thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}

function calculateComedyAmount(thisAmount, perf) {
  thisAmount = 30000;
  if (perf.audience > 20) {
    thisAmount += 10000 + 500 * (perf.audience - 20);
  }
  thisAmount += 300 * perf.audience;
  return thisAmount;
}

function calculateAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = calculateTragedyAmount(thisAmount, perf);
      break;
    case 'comedy':
      thisAmount = calculateComedyAmount(thisAmount, perf);
      break;
      default:
        throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function calculateVolumeCredits(volumeCredits, perf, play) {
  volumeCredits += Math.max(perf.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}

function calculateResult(performances, plays, result) {
  let totalAmount = 0;
  let volumeCredits = 0;
  const format = genDollarFormat();
  for (let perf of performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    // add volume credits
    volumeCredits = calculateVolumeCredits(volumeCredits, perf, play);
    //print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function genDollarFormat() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
}

function statement (invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  return calculateResult(invoice.performances, plays, result);
}

module.exports = {
  statement,
};
