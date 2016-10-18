/**
 * Created by jftac on 10/18/2016.
 */
var Chance = require('chance');
var chance = new Chance();

var generation = 1;

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
    console.log('=== aliens ===',newPop,'(Generation: ' + generation++ + ')');
    if(newPop > 0 && newPop < limit) go(newPop,limit);
    if(newPop > limit) console.log(`Alien Population Limit of [${limit}] reached at Generation [${generation}] with a population of [${newPop}]`);
    if(newPop === 0) console.log(`Alien Population Extinct at Generation [${generation}]`);
}

go(1,1000);