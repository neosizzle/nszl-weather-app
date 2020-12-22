const path = require('path')
const express = require('express')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000


const publicDirPath = path.join(__dirname,"../frontend")//defines path for express config
app.use(express.json())//parse json data into javascript object 
app.use(express.static(publicDirPath))//tell the app to use public dirpath for static assets

//root endpoint with dynamic properties
app.get('',(req,res)=>{
    res.render('index.html')
})



// /weather endpoint    
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "No search results found"
        })
    }
    //geocode function to get the lat and long and convert it into phys location
    geocode(req.query.address,(error, {lat,long,location} = {})=>{//note to self: use default values for deconstructed object error handling
        if(error){
            return res.send({
                error
            })
        }
        //given the lat and long, forecasts the weather and sends a json response
        forecast(lat,long,(forecastError,{currentTemp, currentWeather, currentFeelsLike,humidity,location} = {})=>{
            if(forecastError){
                return res.send({
                    forecastError
                })
            }
            res.send({
                currentFeelsLike,
                currentWeather,
                currentTemp,
                humidity
            })
        })
    })
})

//locationWEather endpoint
app.get('/weatherLocation' , (req,res)=>{
    if(!req.query.lat && !req.query.long){
        return res.send({
            error : "No results found!"
        })
    }
    
    //given the lat and long, forecasts the weather and sends a json response
    forecast(req.query.lat,req.query.long,(forecastError,{currentTemp, currentWeather, currentFeelsLike,humidity,location} = {})=>{
        if(forecastError){
            return res.send({
                forecastError
            })
        }
        res.send({
            currentFeelsLike,
            currentWeather,
            currentTemp,
            humidity,
            location
        })
    })
})




//server startup
app.listen(port,()=>{
    console.log('Server is up on port 3000')
})