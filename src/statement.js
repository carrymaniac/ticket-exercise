const {calculateResult} = require('./calculateInvoice')

const genDollarFormat = () => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format;
}

const genStringResult = (customer, ticketsResult) => {
    const format = genDollarFormat();
    let result = `Statement for ${customer}\n`;
    for (let ticket of ticketsResult.tickets) {
        result += ` ${ticket.name}: ${format(ticket.amount)} (${ticket.audience} seats)\n`;
    }
    result += `Amount owed is ${format(ticketsResult.totalAmount / 100)}\n`;
    result += `You earned ${ticketsResult.volumeCredits} credits \n`;
    return result;
}

const genHTMLResult = (customer, ticketsResult) => {
    const format = genDollarFormat();
    let result = `<h1>Statement for ${customer}</h1>\n`;
    result += '<table>\n';
    result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
    for (let ticket of ticketsResult.tickets) {
        result += ` <tr><td>${ticket.name}</td><td>${ticket.audience}</td><td>${format(ticket.amount)}</td></tr>\n`;
    }
    result += '</table>\n';
    result += `<p>Amount owed is <em>${format(ticketsResult.totalAmount / 100)}</em></p>\n`;
    result += `<p>You earned <em>${ticketsResult.volumeCredits}</em> credits</p>\n`;
    return result;
}

const statement = (invoice, plays) => {
    return genStringResult(invoice.customer, calculateResult(invoice.performances, plays))
}

const statementWithHTML = (invoice, plays) => {
    return genHTMLResult(invoice.customer, calculateResult(invoice.performances, plays))
}

module.exports = {
    statement,
    statementWithHTML
};
