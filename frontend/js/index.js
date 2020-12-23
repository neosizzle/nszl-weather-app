console.log("Client side js working")



//select form and searchvalue and add event listener
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const successMsg = document.getElementById('message-1')
const errorMsg = document.getElementById('message-2')
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
                successMsg.setAttribute('hidden', 'true')
                errorMsg.removeAttribute('hidden');
                errorMsg.textContent = "Error! Try another search" 
                return

            }
            errorMsg.setAttribute('hidden', 'true')
            successMsg.removeAttribute('hidden');
            successMsg.textContent = "Its "+ data.currentWeather+" outside, " + data.currentTemp + " degrees but feels like "+ data.currentFeelsLike+" degrees"+" and its also "+data.humidity+" percent humid outside at " + location + "."
        })
    })
})


locationBtn.addEventListener('click' , (event)=>{
    event.preventDefault()

    //geolocation api for browsers
    if(!navigator.geolocation){
        event.preventDefault()
        successMsg.setAttribute('hidden' , 'true')
        errorMsg.removeAttribute('hidden');
        errorMsg.textContent = "Error! Geolocation service unavailable!" 
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

                successMsg.setAttribute('hidden' , 'true')
                errorMsg.removeAttribute('hidden');
                errorMsg.textContent = "Error! Please try again!" 
                return
              

            }

            errorMsg.setAttribute('hidden', 'true')
            successMsg.removeAttribute('hidden');
            successMsg.textContent = "Its "+ data.currentWeather+" outside, " + data.currentTemp + " degrees but feels like "+ data.currentFeelsLike+" degrees"+" and its also "+data.humidity+" percent humid outside at " + data.location + "."

        })
    })



    })


})

//wont work because its not client side-js
// request({url, json:true}, (error, data)=>{
//     console.log(data)
// })