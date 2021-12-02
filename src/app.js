const path = require('path');
const hbs = require('hbs');
const express = require('express');

const app = express(); 

console.log(__dirname);


//This returns /Users/tashingamusanhu/Desktop/practice/web-servers/public
const publicDirectory = path.join(__dirname, '../public'); 


//this finds index.html. Static Directory to serve
app.use(express.static(publicDirectory));

//import utils
const forecastUtils = require('./utils/forecast'); 
const geocodeutils = require('./utils/geocode');


//---------------------------------- Set View Path 

/*the default place that the server renders the templates is usually found in a 
folder called views, but this was changed to templates so we need to specifiy which folder to go into
*/
const viewsPath = path.join(__dirname,'../templates/views');

console.log('ss', viewsPath);

app.set('views', viewsPath);

//-------------------------------- Setting up partials

/*
Ie set up parts of a page that you want to re use on other pages
*/
const partialsPath = path.join(__dirname,'../templates/partials'); 

console.log('partials', partialsPath);

hbs.registerPartials(partialsPath);


//------------------------ Set View Engine

//Need to tell express which templating we are going to use
app.set('view engine', 'hbs');


//------------------------ Routing 

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Tash'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        weather: 'Super hot',
        name:'Tash'
    });
});

app.get('/weather',(req,res)=>{

    //if there is no address query in the search
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        });
    }

    let address = req.query.address;

    //{latitude,longitude,location}={} - this is saying set the default to an empty object
    geocodeutils.geocode(address, (error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:'address can not be found'
            })
        }

        let long = longitude; 
        let lat =latitude; 
        let loc = location; 

        forecastUtils.forecast(lat,long, (error, data)=>{
            res.send({
                temp: data.temp,
                forecast: data.description,
                percip: data.percip,
                address: loc
            });
        });
    });

   
});

//create a secondary url that sends back JSON 

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: 'This page does not exist',
        name: 'Tash'
    });
});

app.listen(3000,()=>{
    console.log('listening on port 3000');
});
