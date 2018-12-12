const express = require('express')
const request = require('request-promise')
const customer_config = require('./customer_config.json')
const app = express()
const port = 3000
const json2xml = require('json2xml')
const api_key = 'AIzaSyBSMeUHtkAqvto3YfszErGIRwJ4JJgCV3E'

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, response) => {

  let client_req = req.query
  let lat = client_req.lat
  let long = client_req.long
  let name = client_req.customer_name
  let api_key = customer_config[name]["api_key"]
  let type = customer_config[name]["type"].toLowerCase()
  let language = customer_config[name]["language"].toLowerCase()
  let response_output = customer_config[name]["response_output"].toLowerCase()
  let requested_locations = parseInt(customer_config[name]["number_of_nearby_locations_to_request"])
  let google_api_places_request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&rankby=distance&language=${language}&key=${api_key}`;

  var storage = []

  const fetch = (url, token) => {
      request(google_api_places_request, (err, res, body) => {
        if (err) {
          return console.log(err);
        }
      }).then(function(body, res){
           // check if there are proper amount of objects
           // in storage, call a recursive function if not

          if (storage.length < requested_locations && body.next_page_token){

            console.log("Adding locations..")
            Array.prototype.push.apply(storage, body.results)
            fetch(google_api_places_request, body.next_page_token)

          } else if (storage.length >= requested_locations) {
            //If storage is greater than requested locatins, we have enough locations now
            //Just need to trim to the exact amount.

            console.log("Have enough locations.")
            storage = storage.slice(0, requested_locations + 1)

            console.log('Done - sent ' + storage.length + ' locations' + 'out of' + requested_locations + 'back to client.')
            response_output === 'xml' ? response.send(json2xml(storage)) :   response.send(storage)

          } else if (storage.length < requested_locations && !body.next_page_token){
            //to handle the case where if for some reason, there are no more pages to fulfill the requested_locations

            console.log("Couldn't get enough locations. Sent" + storage.length + "locations out of " + requested_locations + " back to client.")
            response_output === 'xml' ? response.send(json2xml(storage)) :   response.send(storage)
          }
          //Then send results back as JSON or XML,
      });
    }

    console.log('Fetching results..')
    fetch(google_api_places_request)
})

module.exports = { app: server, customer_config: customer_config }
