const express = require('express')
const request = require('request');
const app = express()
const port = 3000



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const api_key = 'AIzaSyBSMeUHtkAqvto3YfszErGIRwJ4JJgCV3E'

//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=name, type, language, &locationbias=pont:${lat},${long}&key=YOUR_API_KEY

//nerby search
//var request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}, ${long}&name=${name}&key=${api_key}`;
//app.get('/', (req, res) => res.send('Hello World!'))

//Endpoint accepts request containing parameters
//lat (latitude)
//long (longitude)
//custoner_name (name of customer to search for)

//find place request:
// https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters


app.get('/', function (req, res) {
  console.log(req.query)
  //console.log(req.params)
  let client_req = req.query
  let lat = client_req.lat
  let long = client_req.long
  let name = client_req.customer_name

  let google_api_places_request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?input=${name}&inputtype=textquery&&locationbias=point:${lat},${long}&name=${name}&key=${api_key}`;
  console.log(google_api_places_request)
  //res.send(req.params)
//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY
  request(google_api_places_request , { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    //console.log(res.body)
     //console.log(body.url);
    // console.log(body.explanation);
  });

})
