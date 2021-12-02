//grab the user input in the field
const searchQuery = document.querySelector('input');

//grab the form 
const weatherForm = document.querySelector('form');

//grab the paragraph names
const message1 = document.querySelector('#message-2'); 

//grab the paragraph that will be used to show the weather data
const message2 = document.querySelector('#message-2'); 

//grab card elements
const cardForcast = document.querySelector('#forcast'); 
const cardLocation = document.querySelector('#location');
const cardpercip = document.querySelector('#percip') 

//Add event listener to form
weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();


    message1.textContent = 'Loading...'; 
    message2.textContent = '';
    

    let location = searchQuery.value; 

    //grab the data from the API endpoint
    fetch('/weather?address=' + location).then((response)=>{

        //get the data
        response.json().then((data)=>{

            if(data.error){
                document.getElementById("weather-card").style.display = "none";

                message1.textContent = data.error;

                console.log('There was an error', data.error);

            }else{
                //message1.textContent = data.forecast
                //message2.textContent = data.address
                console.log(data);
                cardForcast.textContent = data.forecast; 
                cardLocation.textContent = 'Location: ' + data.address; 
                cardpercip.textContent = 'Chance of percipitation: ' + data.percip + '%'; 

                document.getElementById("weather-card").style.display = "block";
            }
        })
    });
}); 