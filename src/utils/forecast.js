const request = require('request');

const forecast = (latidude, longitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=5c58b351aebb01621d72da1826bdacf7&query='+latidude+','+longitude; 

    request({url:url, json:true},(error,response)=>{
        
        if(error){
            callback('Can not connect to the internet', undefined)
        }else if(response.body.error){
            callback('Can not find location', undefined)
        }else{
            let temp = response.body.current.temperature; 
            let description = response.body.current.weather_descriptions[0];
            let percip = response.body.current.precip; 
            callback(undefined, {
                temp,
                description: `The weather is ${temp} degrees, ${description} and ${percip} % chance of rain`,
                percip
            });
                //`The weather is ${temp} degrees, ${description} and ${percip} % chance of rain`
                
                /*
               {
                temperature: response.body.current.temperature,
                description: response.body.current.weather_descriptions[0],
                percip: response.body.current.precip
            });*/
        }
    });

};

module.exports = {forecast};