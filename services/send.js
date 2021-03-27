const request = require('request')

module.exports = {
    sendMessage: async (token, msg) => {
        return request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
              'bearer': token
            },
            form: {
              message: msg
            }
          }, (err, httpResponse, body) => {
            if(err){
              console.log(err);
            } else {
             console.log('err')
            }
          });
    }
}