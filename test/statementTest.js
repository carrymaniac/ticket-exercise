const test = require('ava');
const {statement, statementWithHTML} = require('../src/statement');

test('statement one, BigCo Buy 30 hamlet', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (30 seats)\n`
        + `Amount owed is $400.00\n`
        + `You earned 0 credits \n`;
    //then
    t.is(result, expectResult);

});
test('statement two, BigCo Buy 31 hamlet', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $410.00 (31 seats)\n`
        + `Amount owed is $410.00\n`
        + `You earned 1 credits \n`;
    //then
    t.is(result, expectResult);

});
test('statement three, BigCo Buy 20 as-like', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` As You Like It: $360.00 (20 seats)\n`
        + `Amount owed is $360.00\n`
        + `You earned 4 credits \n`;
    //then
    t.is(result, expectResult);

});
test('statement four, BigCo Buy 21 as-like', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
            }
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` As You Like It: $468.00 (21 seats)\n`
        + `Amount owed is $468.00\n`
        + `You earned 4 credits \n`;
    //then
    t.is(result, expectResult);

});
test('statement five, BigCo Buy 55 hamlet, 35 as-like, 40 othello', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $650.00 (55 seats)\n`
        + ` As You Like It: $580.00 (35 seats)\n`
        + ` Othello: $500.00 (40 seats)\n`
        + `Amount owed is $1,730.00\n`
        + `You earned 47 credits \n`;
    //then
    t.is(result, expectResult);

});
test('statement six, SmallCo Buy 29 hamlet, 19 as-like, 29 othello', t => {
    //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 29,
            },
            {
                'playID': 'as-like',
                'audience': 19,
            },
            {
                'playID': 'othello',
                'audience': 29,
            },
        ],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for SmallCo\n'
        + ` Hamlet: $400.00 (29 seats)\n`
        + ` As You Like It: $357.00 (19 seats)\n`
        + ` Othello: $400.00 (29 seats)\n`
        + `Amount owed is $1,157.00\n`
        + `You earned 3 credits \n`;
    //then
    t.is(result, expectResult);
});
test('statement seven,UnNormalCo Buy not exist Tickets', t => {
    //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [
            {
                'playID': 'ohamlet',
                'audience': 29,
            }
        ],
    };
    //when
    //then
    try {
        statement(invoice, plays);
    } catch (e) {
        t.is(e.message, "unknown type: no-tragedy")
    }

});
test('statement eight,UnNormalCo Buy none Tickets', t => {
    //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [],
    };
    //when
    const result = statement(invoice, plays);
    const expectResult = 'Statement for SmallCo\n'
        + `Amount owed is $0.00\n`
        + `You earned 0 credits \n`;
    //then
    t.is(result, expectResult);

})
test('statement Nine,BigCo Buy 55 hamlet, 35 as-like, 40 othello By HTML', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };
    //when
    const result = statementWithHTML(invoice, plays);
    const expectResult = '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n';
    //then
    t.is(result, expectResult);
})
const plays = {
    'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
    },
    'ohamlet': {
        'name': 'oHamlet',
        'type': 'no-tragedy',
    },
    'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
    },
    'othello': {
        'name': 'Othello',
        'type': 'tragedy',
    },

};