console.log("Client side js working")



//select form and searchvalue and add event listener
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const locationBtn = document.getElementById("myLocation")


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    ////another method
    // console.log(url)
    // window.location.href = url;

    
    //fetch command from client to get json data
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = "Error!" 
                msg2.textContent = "Try another search"
                return

            }
            msg1.textContent = location
            msg2.textContent = "Its "+ data.currentWeather+" outside, " + data.currentTemp + " degrees but feels like "+ data.currentFeelsLike+" degrees"+" and its also "+data.humidity+" percent humid outside"
        })
    })
})


locationBtn.addEventListener('click' , (event)=>{
    event.preventDefault()

    //geolocation api for browsers
    if(!navigator.geolocation){
        event.preventDefault()
        msg1.textContent = "Error!" 
        msg2.textContent = "Geolocation service unavailable!"
        return
    }

    //navigator bad, no async support
    navigator.geolocation.getCurrentPosition((position)=>{
        const url = '/weatherLocation?lat=' + position.coords.latitude + "&long=" + position.coords.longitude
        console.log(url)
         //fetch command from client to get json data
         fetch(url).then((response)=>{
            response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                msg1.textContent = "Error!" 
                msg2.textContent = "Please try again!"
                return

            }
            msg1.textContent = data.location
            msg2.textContent = "Its "+ data.currentWeather+" outside, " + data.currentTemp + " degrees but feels like "+ data.currentFeelsLike+" degrees"+" and its also "+data.humidity+" percent humid outside"
        })
    })



    })


})

//wont work because its not client side-js
// request({url, json:true}, (error, data)=>{
//     console.log(data)
// })