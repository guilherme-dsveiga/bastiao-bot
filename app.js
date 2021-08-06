const Twit = require('twit');
const fetch = require('node-fetch');
const T = new Twit({
    consumer_key: '-',
    consumer_secret: '-',
    access_token: '-',
    access_token_secret: '-',
});

var tweetId;
var tweetCount = 20;

console.log("funcionando...");

setInterval(botInit, 5000);

function botInit() {
    var params1 = {
        q: 'bastiao',
        count: tweetCount
    }

    T.get('search/tweets', params1, gotData);

    function gotData(err, data, response) {
        console.log(data);
        for (var i = 0; i < tweetCount; i++) {
            if (data.statuses[i].retweeted == false) {
                tweetId = data.statuses[i].id_str;
                retweetId(tweetId);
            } else {
                console.log("Ja foi retweetado");
            }

        }
    }

    function retweetId(id) {
        var params2 = {
            id: id
        }

        T.post('statuses/retweet', params2, retweetDone);

        function retweetDone(err, data, response) {
            console.log(data);
        }
    }
}
