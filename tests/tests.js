const assert = require('assert');
const request = require('supertest');

const expect    = require("chai").expect;
const customer_config = require('../customer_config.json')
const app = require('../app.js')

describe('GET /', function() {


  //check returns correct response
  it('respond with json', function(done) {
    request(app)
      .get('/')
      .send({ 'customer_name': 'Happy Credit Union', 'lat': 30.267153, 'long': -97.7430608})
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end(function(err, res) {
        if (err) throw err;
      });
  });

  //
  it('respond with xml', function(done) {
    request(app)
      .get('/')
      .send({ 'customer_name': 'Sunrise Bank', 'lat': 30.267153, 'long': -97.7430608})
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with xml', function(done) {
    request(app)
      .get('/')
      .send({ 'customer_name': 'Paris FCU', 'lat': 30.267153, 'long': -97.7430608})
      .expect('Content-Type', /xml/)
      .expect(200, done);
  });
  //handles bad inputs



});
