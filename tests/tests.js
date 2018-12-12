const assert = require('assert');
const request = require('supertest');
const expect    = require("chai").expect;
const { app }  = require('../app.js')
const { customer_config } = require('../app.js')
const parser = require('xml2json');
const randomLocation = require('random-location')

//setup for random data insertion
//this will choose a random bank in customer config
const randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

//creates a search radius around a random point somewhere in San Francisco
const P = {
  latitude: 37.7768006,
  longitude: -122.4187928
}
const R = 32180 // 20 mile circumference
const randomPoint = randomLocation.randomCirclePoint(P, R)


describe('GET /', function() {

  let random_bank = randomProperty(customer_config)

  it('responds with correct content-type', function(done) {
    request(app)
      .get('/')
      .query({ customer_name: random_bank.customer_name, lat: randomPoint.latitude, long: randomPoint.longitude })
      .expect(function(res) {
        let xml = "text/html; charset=utf-8"
        let json = "application/json; charset=utf-8"

        var requested_content = res.header['content-type']
        let bool

        if (random_bank.response_output === 'XML') {
            bool = requested_content === xml ? true : false
        } else {
            bool = requested_content === json ? true : false
        }

         if (!bool && !res.serverError) throw new Error("incorrect content type returned");

      })
      .end(done)
  });


  it('responds with correct location count that is never more than what is requested', function(done) {
    request(app)
      .get('/')
      .query({ customer_name: random_bank.customer_name, lat: randomPoint.latitude, long: randomPoint.longitude })
      .expect(function(res) {
         if (res.body.length > random_bank.number_of_nearby_locations_to_request) {
           throw new Error("request is not returning correct requested locations amount");
         }
      })
      .end(done)
    });

});
