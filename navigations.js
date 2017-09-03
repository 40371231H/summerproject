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

        // Async search
        // Store
        //     .searchWeathers(destination)
        //     .then(function (weathers) {
        //         // Results
        //         var message = new builder.Message()
        //             .attachmentLayout(builder.AttachmentLayout.carousel)
        //             .attachments(weathers.map(weatherAsAttachment));

        //         session.send(message);

        //         // End
        //         session.endDialog();
        //     });
        session.endDialog();
    },

    /*function createMapCard(session) {
        return new builder.MapCard(session)
            .title('路線')
            .subtitle('從 %s 到 %s', startPoint, endPoint)
            .text('幫你搜尋到的路線')
            .images([
                builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://www.google.com.tw/maps/dir/台北/高雄市/', 'Get Started')
            ]);
    }*/
];