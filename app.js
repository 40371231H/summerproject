require('dotenv-extended').load();

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var DialogLabels = {
    Weathers: 'Weathers',
    Navigations: 'Navigations',
    Times: 'Times',
    Exchanges: 'Exchanges'
};

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        // prompt for search option
        builder.Prompts.choice(
            session,
            '請問你要使用何項功能？',
            [DialogLabels.Times, DialogLabels.Weathers, DialogLabels.Navigations, DialogLabels.Exchanges],
            {
                maxRetries: 3,
                retryPrompt: 'Not a valid option'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('嘗試太多次，將重新導覽。');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Times:
                return session.beginDialog('times');
            case DialogLabels.Weathers:
                return session.beginDialog('weathers');
            case DialogLabels.Navigations:
                return session.beginDialog('navigations');
            case DialogLabels.Exchanges:
                return session.beginDialog('exchanges');
        }
    }
]);

bot.dialog('times', require('./times'));
bot.dialog('weathers', require('./weathers'));
bot.dialog('navigations', require('./navigations'));
bot.dialog('exchanges', require('./exchanges'))
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});