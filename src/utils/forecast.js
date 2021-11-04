const request = require('request')
const forecast = (latitude, longitude, callback)=>{
     const url = 'http://api.weatherstack.com/current?access_key=e8abe7a0cd0423eba645ca730f049a5d&query=' + latitude + ',' + longitude + '&units=f'
     //here is a correction in url , in lecture it is lat, long pattern but actually it is long, lat pattern in the url string
     //above url has dynamic co ordinates
     request({url, json:true}, (error, {body})=>{
         if(error){
                callback('Unable to connect to weather service', undefined)
         }else if(body.error){
             callback('Unable to find location', undefined)

         }else{
                callback(undefined,'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike)

         }
     })

}

module.exports = forecast