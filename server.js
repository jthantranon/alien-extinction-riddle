// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Simple in-memory store for now
var dreams = [];
var generation = 1;

app.get("/dreams", function (request, response) {
  generation = 1;
  dreams = [];
  go(1,1000);
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var Chance = require('chance');
var chance = new Chance();



function die(){
    console.log('--- die ---');
    return 0;
}

function nothing(){
    console.log('--- nothing ---');
    return 1;
}

function replicate(){
    console.log('--- replicate ---');
    return 2;
}

function multiply(){
    console.log('--- multiply ---');
    return 3;
}

var options = [
    die,
    nothing,
    replicate,
    multiply
];

function go(startingPopulation,limit){
    var newPop = 0;
    for(startingPopulation;startingPopulation > 0; startingPopulation--){
        newPop += options[chance.d4()-1]();
    }
    dreams.push(`Alien Population reached Generation [${generation}] with a population of [${newPop}]`);
    console.log('=== aliens ===',newPop,'(Generation: ' + generation + ')');
    if(newPop > 0 && newPop < limit) {
      generation++;
      go(newPop,limit);
    }
    if(newPop > limit) {
      var msg = `Alien Population Limit of [${limit}] reached at Generation [${generation}] with a population of [${newPop}]`
      console.log(msg);
      dreams.push(msg);
      // dreams[0] = newPop;
    }
    if(newPop === 0) {
      var msg = `Alien Population Extinct at Generation [${generation}]`
      console.log(msg);
      dreams.push(msg);
    }
}