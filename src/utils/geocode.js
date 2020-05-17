const request = require('request')

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibnN6bCIsImEiOiJjazhyYThvbWQwY21sM3Juc3l0eHVnbGY1In0.vkdhW9TMdmu1PVsdgk82_Q&limit=1"

    request({url, 'json':true}, (error,{body} = {})=>{//destructs response pbject to get body contents
        //low level error handling (no response acquired)
       if(error){
        callback("Geocode service Unavailable",undefined)
       }else if (body.features.length == 0 ){//response has no matches found
        callback("No matches found!", undefined)
       }
       else{//everything works fine
           const lat = body.features[0].center[1]
           const long = body.features[0].center[0]
           const location =body.features[0].place_name
          
           callback(undefined, {
               lat,
               long,
               location
           })
       }
   
   
   
   
    })
   
}

module.exports= geocode