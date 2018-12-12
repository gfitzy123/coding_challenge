const express = require('express')
const request = require('request-promise')
const customer_config = require('./customer_config.json')
const app = express()
const port = 3000
const json2xml = require('json2xml')
const api_key = 'AIzaSyBSMeUHtkAqvto3YfszErGIRwJ4JJgCV3E'

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', function (req, response) {

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
      request(google_api_places_request, { json: true }, (err, res, body) => {
        if (err) {
          return console.log(err);
        }
      }).then(function(body, res){
           // check if there are proper amount of objects
           // in storage, call a recursive function if not

          if (storage.length < requested_locations && body.next_page_token){

            Array.prototype.push.apply(storage, body.results)
            fetch(google_api_places_request, body.next_page_token)

          } else if (storage.length > requested_locations) {
            //If storage is greater than requested locatins, we have enough locations now
            //Just need to trim to the exact amount.

            storage = storage.slice(0, requested_locations + 1)

            if (response_output === 'xml'){
                console.log('Done - sent ' + storage.length + ' locations back to client.')
                response.send(json2xml(storage))
            } else {
                console.log('Done - sent ' + storage.length + ' locations back to client.')
                response.send(storage)
            }
          } else if (storage.length < requested_locations && !body.next_page_token){
            //to handle the case where if for some reason, there are no more pages to fulfill the requested_locations
              if (response_output === 'xml'){
                  console.log('Done - sent ' + storage.length + ' locations back to client.')
                  response.send(json2xml(storage))
              } else {
                  console.log('Done - sent ' + storage.length + ' locations back to client.')
                  response.send(storage)
              }
          }
          //Then send results back as JSON or XML,
      });
    }

    console.log('Fetching results..')
    fetch(google_api_places_request)

})
