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

  it('responds with json', function(done) {
    let random_bank = randomProperty(customer_config)

    request(app)
      .get('/')
      .query({ customer_name: random_bank.customer_name, lat: randomPoint.latitude, long: randomPoint.longitude })
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('responds with xml', function(done) {
    request(app)
      .get('/?customer_name=Paris FCU&lat=30.267153&long=-97.7430608')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(200, done)
  });

  it('responds with correct location count', function(done) {
    request(app)
      .get('/')
      .query({ customer_name: random_bank.customer_name, lat: randomPoint.latitude, long: randomPoint.longitude })
      .expect(function(res) {
         if (res.body.length !=== random_bank.number_of_nearby_locations_to_request) {
           throw new Error("request is not returning correct requested locations amount");
         }
      }, done).catch(done)
    });
  //

  it('responds in correct lanaguage', function(done) {
    request(app)
      .get('/')
      .query({ customer_name: random_bank.customer_name, lat: randomPoint.latitude, long: randomPoint.longitude })
      .send({ 'customer_name': 'Paris FCU', 'lat': 30.267153, 'long': -97.7430608})
      .expect('Content-Type', /xml/)
      .expect(200, done);
  });



});
