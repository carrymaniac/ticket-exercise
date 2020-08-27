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

function genDollarFormat() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
}

function calculateResult(performances, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let tickets = [];
  for (let perf of performances) {
    const play = plays[perf.playID];
    let thisAmount = calculateAmount(play, perf);
    let ticket = {
      "name": play.name,
      "amount":thisAmount / 100,
      "audience":perf.audience
    }
    tickets.push(ticket);
    // add volume credits
    volumeCredits = calculateVolumeCredits(volumeCredits, perf, play);
    //print line for this order
    totalAmount += thisAmount;
  }
  return {
    "tickets": tickets,
    "totalAmount": totalAmount,
    "volumeCredits": volumeCredits
  };
}

function genStringResult(customer,ticketsResult){
  const format = genDollarFormat();
  let result = `Statement for ${customer}\n`;
  for(let ticket of ticketsResult.tickets){
    result += ` ${ticket.name}: ${format(ticket.amount)} (${ticket.audience} seats)\n`;
  }
  result += `Amount owed is ${format(ticketsResult.totalAmount / 100)}\n`;
  result += `You earned ${ticketsResult.volumeCredits} credits \n`;
  return result;
}

function statement (invoice, plays) {
  let TicketsResult = calculateResult(invoice.performances, plays);
  return genStringResult(invoice.customer,TicketsResult)
}

module.exports = {
  statement,
};
