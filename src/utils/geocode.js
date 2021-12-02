const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFzaG0iLCJhIjoiY2t2MHFjbWFrMWFjczJ1cXF5cWs5ZmlvaSJ9._Q7BJ85c3AJ2DRbpN_02UQ&limit=1';

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Can not connect to the internet', undefined);
        }else if(response.body.features.length === 0){
            callback('Can not find location', undefined);
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1], 
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    });
}

module.exports = {geocode};