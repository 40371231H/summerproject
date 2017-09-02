var Promise = require('bluebird');

module.exports = {
    searchWeathers: function (destination) {
        return new Promise(function (resolve) {

            // Filling the weathers results manually just for demo purposes
            var weathers = [];
            for (var i = 1; i <= 1; i++) {
                weathers.push({
                    name: destination + ' Weather ',
                    location: destination,
                    image: 'https://placeholdit.imgix.net/~text?txtsize=35&txt=Weather+' + i + '&w=500&h=260'
                });
            }

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(weathers); }, 1000);
        });
    }
};