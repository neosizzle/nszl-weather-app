
const request = require('request')

const forecast = (lat,long,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=3689f78da05b899ecebd05ee5cc84b6f&query='+lat+','+ long+'&units=m'

    request({url, 'json':true}, (error, {body})=>{//destructs response pbject to get body contents

    //low level error handling (no response acquired)
    if(error){
        callback('Weather service unavailable!', undefined)
    }else if(body.error){//error response acquired
        callback("Error code : "+ body.error.code+ ". " +body.error.info,undefined)
    }
    else{//everything works fine
     //set constants to string
    const currentTemp = body.current.temperature
    const currentWeather = body.current.weather_descriptions[0]
    const currentFeelsLike = body.current.feelslike
    const humidity = body.current.humidity
    const location = body.location.name

     //log results as output
     callback(undefined,{
         currentTemp,
         currentWeather,
         currentFeelsLike,
         humidity,
         location
     })
    }
 
 })


}


module.exports = forecast

