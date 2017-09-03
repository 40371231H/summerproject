var builder = require('botbuilder');
var Store = require('./store');

module.exports = [
    // Destination
    function (session) {
        session.send('歡迎來到天氣功能');
        builder.Prompts.text(session, '請輸入你的地理位置');
    },

    // Search...
    function (session, results) {
        session.dialogData.destination = results.response;
        var destination = session.dialogData.destination;

        session.send(
            '尋找關於 %s 天氣', destination);

        // Async search
        Store
            .searchWeathers(destination)
            .then(function (weathers) {
                // Results
                var message = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(weathers.map(weatherAsAttachment));

                session.send(message);

                // End
                session.endDialog();
            });
    }
];

// Helpers
function weatherAsAttachment(weather) {
    return new builder.HeroCard()
        .title(weather.name)
        .subtitle('查詢結果：' + weather.name)
        .images([new builder.CardImage().url(weather.image)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.google.com.tw/search?source=hp&q=weather' + encodeURIComponent(weather.location))
        ]);
}