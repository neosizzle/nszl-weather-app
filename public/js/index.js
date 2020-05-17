console.log("Client side js working")




//fetch command from client to get json data
fetch('http://localhost:3000/weather?address=').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return console.log("error")
        }
        console.log(data)
    })
})

//select form and searchvalue and add event listener
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


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
            msg2.textContent = "Its "+ data.currentWeather+" outside, " + data.currentTemp + " degrees but feels like "+ data.currentFeelsLike+" degrees."
        })
    })
})


//wont work because its not client side-js
// request({url, json:true}, (error, data)=>{
//     console.log(data)
// })