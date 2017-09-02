//https://www.google.com.tw/maps/dir/"起點"/"終點"/
var builder = require('botbuilder');

module.exports = [
    // Destination start
    function (session) {
        session.send('歡迎來到導航功能');
        builder.Prompts.text(session, '請輸入你的出發地');
    },

    // Search...
    function (session, results) {
        session.dialogData.destination = results.response;
        var destination = session.dialogData.destination;

        session.send(
            '尋找關於 %s 天氣', destination);

        // // Async search
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
    }
];