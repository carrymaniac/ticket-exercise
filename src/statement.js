function calculateTragedyAmount(thisAmount, performance) {
  thisAmount = 40000;
  if (performance.audience > 30) {
    thisAmount += 1000 * (performance.audience - 30);
  }
  return thisAmount;
}

function calculateComedyAmount(thisAmount, performance) {
  thisAmount = 30000;
  if (performance.audience > 20) {
    thisAmount += 10000 + 500 * (performance.audience - 20);
  }
  thisAmount += 300 * performance.audience;
  return thisAmount;
}

function calculateAmount(play, performance) {
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

function calculateVolumeCredits(volumeCredits, performance, play) {
  volumeCredits += Math.max(performance.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === play.type) volumeCredits += Math.floor(performance.audience / 5);
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
  for (let performance of performances) {
    const play = plays[performance.playID];
    let thisAmount = calculateAmount(play, performance);
    let ticket = {
      "name": play.name,
      "amount":thisAmount / 100,
      "audience":performance.audience
    }
    tickets.push(ticket);
    // add volume credits
    volumeCredits = calculateVolumeCredits(volumeCredits, performance, play);
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
function genHTMLResult(customer,ticketsResult){
  const format = genDollarFormat();
  let result = `<h1>Statement for ${customer}</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  for(let ticket of ticketsResult.tickets){
    result += ` <tr><td>${ticket.name}</td><td>${ticket.audience}</td><td>${format(ticket.amount)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>Amount owed is <em>${format(ticketsResult.totalAmount / 100)}</em></p>\n`;
  result += `<p>You earned <em>${ticketsResult.volumeCredits}</em> credits</p>\n`;
  return result;
}
function statement (invoice, plays) {
  let TicketsResult = calculateResult(invoice.performances, plays);
  return genStringResult(invoice.customer,TicketsResult)
}
function statementWithHTML(invoice, plays){
  let TicketsResult = calculateResult(invoice.performances, plays);
  return genHTMLResult(invoice.customer,TicketsResult)
}

module.exports = {
  statement,
  statementWithHTML
};
