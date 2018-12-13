# Coding Challenge

The objective of the coding challenge was to create an API endpoint through which a user could request a group of locations defined by existing customer information.

## Getting Started

Clone down the repo, and then npm install.

### Prerequisites

You may need to install the latest version of Node.js and a utility tool to hit endpoints (such as Postman).

You will also need existing Google Places API keys in order to successfully utilize the endpoint. You have to replace them in the customer_config.json file.

You can acquire them here: https://developers.google.com/places/web-service/get-api-key


### Installing

Clone down the repo and simply: 

```
npm install
```


## Running the tests


```
mocha tests/test.js
```


## Deployment

To run the application:

```
node app.js
```

## API endpoint

To hit the endpoint, make a request to '/' with parameters as follows:

```
{ 
  customer_name: 'Sunrise Bank',
  lat: < a latitude coordinate > ,
  long: < a longitude coordinate
}
```

The endpoint will return an amount of locations as set in the customer configuration file.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on codes of conduct, and the process for submitting pull requests to me.


