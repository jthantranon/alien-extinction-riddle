var express = require('express');
var app = express();
var Chance = require('chance');
var chance = new Chance();

app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var dreams = [
  'placeholder',
  '================================================='
];
var generation = 1;

app.get("/dreams", function (request, response) {
  generation = 1;
  dreams = [
    'placeholder',
    '================================================='
  ];
  go(1,5000);
  response.send(dreams);
});

app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function die(){
    var msg = '--- (a) an alien dies [-1] ---';
    console.log(msg);
    dreams.push(msg);
    return 0;
}

function nothing(){
    var msg = '--- (b) an alien does nothing [+0] ---';
    console.log(msg);
    dreams.push(msg);
    return 1;
}

function replicate(){
    var msg = '--- (c) an alien replicates itself (2) [+1] ---';
    console.log(msg);
    dreams.push(msg);
    return 2;
}

function multiply(){
    var msg = '--- (d) an alien replicates itself twice (3) [+2] ---';
    console.log(msg);
    dreams.push(msg);
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
      dreams[0] = msg;
      dreams.push(msg);
      // dreams[0] = newPop;
    }
    if(newPop === 0) {
      var msg = `Alien Population Extinct at Generation [${generation}]`
      dreams[0] = msg;
      console.log(msg);
      dreams.push(msg);
    }
}