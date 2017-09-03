var builder = require('botbuilder');

module.exports = [
    // Destination start
    function (session) {
        session.send('歡迎來到導航功能');
        builder.Prompts.text(session, '請輸入你的出發地');
    },
    function (session, results, next) {
        session.dialogData.startPoint = results.response;
        next();
    },

    // Destination end
    function (session) {
        builder.Prompts.text(session, '請輸入你的目的地');
    },
    function (session, results, next) {
        session.dialogData.endPoint = results.response;
        next();
    },

    // Search...
    function (session, results) {
        session.dialogData.destination = results.response;
        var startPoint = session.dialogData.startPoint;
        var endPoint = session.dialogData.endPoint;

        session.send('尋找關於 %s 到 %s 的路線', startPoint, endPoint);
        //session.send('尋找關於 ' + startPoint + ' 到 ' + endPoint + '的路線');
        session.send('https://www.google.com.tw/maps/dir/' + startPoint + '/' + endPoint + '/');
        //builder.CardAction.openUrl(session, 'https://www.google.com.tw/maps/dir/' + startPoint + '/' + endPoint + '/', 'Get Started');
        //createMapCard(session);

        var msg = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .title('路線')
                    .subtitle('從 %s 到 %s', startPoint, endPoint)
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://www.google.com.tw/maps/dir/' + startPoint + '/' + endPoint + '/', 'Get Started')
                    ])
            ]);
        session.send(msg);
        session.endDialog();
    }
];