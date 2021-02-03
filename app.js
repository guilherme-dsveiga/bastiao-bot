const Twit = require('twit');
const fetch = require('node-fetch');
const T = new Twit({
    consumer_key: 'cjwWnNHnWFb8lZ4Q3S0lrsomr',
    consumer_secret: '0RkiBl66wNhl46m1eD4xGNil4xx4aLK62vDr4gIyqt98p6E6Cg',
    access_token: '1331688378769829890-Z5WQ4LjVCu7Yq2TUxibsl1u15IYnDL',
    access_token_secret: 'rGaeygYjIqLGCFRahXp3gr5KiDrJl2TxBgmF4SZPoUH8V',
});

var tweetId;
var tweetCount = 20;

setInterval(botInit, 5000);

function botInit() {

    console.log('Este bot está rodando...');

    var params1 = {
        q: 'bastiao',
        count: tweetCount,
        result_type: 'recent'
    }

    T.get('search/tweets', params1, gotData);

    function gotData(err, data, response) {
        console.log(data);
        for (var i = 0; i < tweetCount; i++) {
            if (data.statuses[i].retweet_count < 1) {
                tweetId = data.statuses[i].id_str;
                console.log("O ID DO TWEET EH: " + tweetId);
                retweetId(tweetId);
            }
        }
    }

    function retweetId(id) {
        var params2 = {
            id: id
        }

        T.post('statuses/retweet', params2, retweetDone);

        function retweetDone(err, data, response) {
            console.log("Retweet Feito");
        }
    }
}
