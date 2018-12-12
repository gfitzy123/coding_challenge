const assert = require('assert');
const request = require('supertest');
const expect    = require("chai").expect;
const { app }  = require('../app.js')
const { customer_config } = require('../app.js')

//const { customer_config } = require('../../customer_config.json')


describe('GET /', function() {


  //check returns correct response
  // it('responds with xml', function(done) {
  //   request(app)
  //     .get('/?customer_name=Paris FCU&lat=30.267153&long=-97.7430608')
  //     .send({ 'customer_name': 'Happy Credit Union', 'lat': 30.267153, 'long': -97.7430608})
  //     .expect('Content-Type', /text/html; charset=utf-8/)
  //     .expect(200, done)
  // });

  it('responds with json', function(done) {
    request(app)
      .get('/')
      .send({ 'customer_name': 'Happy Credit Union', 'lat': 30.267153, 'long': -97.7430608})
      .expect('Content-Type', /json/)
      .expect(200, done)
  });




  //
  // it('respond with xml', function(done) {
  //   request(app)
  //     .get('/')
  //     .send({ 'customer_name': 'Sunrise Bank', 'lat': 30.267153, 'long': -97.7430608})
  //     .expect('Content-Type', /json/)
  //     .expect(200, done);
  // });
  //
  // it('respond with xml', function(done) {
  //   request(app)
  //     .get('/')
  //     .send({ 'customer_name': 'Paris FCU', 'lat': 30.267153, 'long': -97.7430608})
  //     .expect('Content-Type', /xml/)
  //     .expect(200, done);
  // });
  //handles bad inputs



});
