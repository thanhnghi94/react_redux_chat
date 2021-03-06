const regexTemplate = /(http|https):\/\/twitter.com\/([^\/"\s]*)\/status\/(\d+)/;

export default function (url) {
    let result = url.match(regexTemplate);
    if (result) {
        return {
            url: result[0],
            twitterUser: result[2],
            tweetId: result[3]
        };
    } else {
        return null;
    }
};
