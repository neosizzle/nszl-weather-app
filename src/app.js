const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//SET express settings / set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//USE static asset eg html or client side js
app.use(express.static(publicDirPath))

//root endpoint with dynamic properties
app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather app",
        name : "nszl"
    })
})

// /about endpoint with dynamic properties
app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About me",
        name : "nszl"
    })
})

// /help endpoint with dynamic properties
app.get('/help',(req,res)=>{
    res.render('help',{
        title : "HELP",
        message : "ME",
        name : "nszl"
    })
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
        forecast(lat,long,(forecastError,{currentTemp, currentWeather, currentFeelsLike,humidity} = {})=>{
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


//unknown help endpoint 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        code:'404',
        message:'Sorry, we couldnt get you help at the moment.',
        name: 'nszl'
    })
})

//unknown endpoint
app.get('*',(req,res)=>{
    res.render('error',{
        code:'404',
        message:'Sorry, we couldnt find that page.',
        name: 'nszl'
    })
})

//server startup
app.listen(port,()=>{
    console.log('Server is up on port 3000')
})