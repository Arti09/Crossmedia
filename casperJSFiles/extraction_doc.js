
var utils = require('utils');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
  },
  clientScripts: ['/Users/Arti/Downloads/jquery-2.1.1.js'] // Inject jquery library, allows use of $ variables
});

var currentLink = "";
var hasArg = casper.cli.has("site");
if(hasArg){
 currentLink = casper.cli.get("site"); 
}
else{
 currentLink = 'http://www.ergebnisselive.com/eishockey/deutschland/del/';
}

var i = 0;
var links = "";
var currentEvent = "";
var amountteams = [];
var amountEachEvent = [];
var events = [];
var teams = [];
var total = [];
var wins = [];
var loss = [];
var winsOver = [];
var lossOver = [];
var goals = [];
var points = [];

var town_data = [];
var strings = [];
 
function getTeamsPerLeague () {
  var some = document.getElementById('table-type-1').querySelectorAll('tbody > tr[data-def-order]');
  
  return [].map.call(some, function(link) {
    return link.getAttribute('data-def-order');
  });
}

function getTeams () {
  links = document.getElementById('table-type-1').querySelectorAll('.team_name_span > a');

  return [].map.call(links, function(link) {
    return link.innerHTML;
  });
}

function getEventName () {
  var some = document.getElementById('table-type-1').querySelectorAll('.participant_name.col_name.gTableSort-switch > a > span.txt');

  return [].map.call(some, function(link) {
    return link.innerHTML;
  });
}

function getTotalGames () {
  var some = document.getElementById('table-type-1').querySelectorAll('.matches_played.col_matches_played');
  
  return [].map.call(some, function(link) {
    return link.innerText;
  });
}


function getWins () {
  var some  = document.getElementById('table-type-1').querySelectorAll('.wins.col_wins');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}

function getLoss () {
  var some  = document.getElementById('table-type-1').querySelectorAll('.losses.col_losses');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}


function getWinsOver () {
  var some  = document.getElementById('table-type-1').querySelectorAll('.wins_ot.col_wins_ot');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}
function getLossOver () {
  var some  = document.getElementById('table-type-1').querySelectorAll('.losses_ot.col_losses_ot');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}

function getGoalDifference () {
  var some  = document.getElementById('table-type-1').querySelectorAll('td + td.goals.col_goals');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}
function getPoints () {
  var some  = document.getElementById('table-type-1').querySelectorAll('td.goals.col_goals + td.goals.col_goals');

  return [].map.call(some, function(link) {
    return link.innerText;
  });
}


function getLeague () {
  var title = document.querySelector('title');
  var output = title.innerHTML.split(" ");
  if(output[1] == 'Nord' || output[1] == 'Süd' || output[1] == 'West' || output[1] == 'Ost'){
     out = output[0] + "_" + output[1];
  }else{
     out = output[0];
  }
  return out;
}

function getCountry () {
  var title = document.querySelector('title');
  var output = title.innerHTML.split(" ");
  var out = output[output.length-1];
  return out;
}

function getSeason () {
  var title = document.querySelector('title');
  var output = title.innerHTML.split(" ");
  var out = "";
  if(output[1] == 'Nord' || output[1] == 'Süd' || output[1] == 'West' || output[1] == 'Ost'){
     out = output[2];
  }else{
     out = output[1];
  }
  return out;
}

function getLink () {
        var something = document.querySelectorAll('.selected-country-list > li > a');
       return [].map.call(something, function(link) {
          return link.href;
        });
}

function getNationality () {
  var some = content.querySelectorAll('tr');
  return some;
}

function calculateSizes () {
  var output = [];
  var temp = 0;
  for(var i=0; i<amountteams.length; i++){
    currentAmount = amountteams[i];
    if(currentAmount > temp){
      temp = amountteams[i];
    }
    else{
      output.push(temp);
      temp = 0;
    }
  }
  return output;
}

casper.start(currentLink, function() {
  linksSite = this.evaluate(getLink);
});

casper.then(function(){
      this.echo('<?xml version="1.0" encoding="UTF-8"?>');           
      this.echo('<article xml:lang="en" xmlns="http://docbook.org/ns/docbook" version="5.0" xmlns:xi="http://www.w3.org/2001/XInclude" xmlns:xl="http://www.w3.org/1999/xlink">');
      this.echo('<info>');    
      this.echo('<title>DocBook</title>');
      this.echo('</info>');
      this.echo('<section>');
      this.echo('<table>');
      this.echo('<title>Teams Table Per League</title>');

      this.each(linksSite,function(self,link){
        self.thenOpen(link,function(){
            events = this.evaluate(getEventName);
            total = this.evaluate(getTotalGames);
            wins = this.evaluate(getWins);
            loss = this.evaluate(getLoss);
            winsOver = this.evaluate(getWinsOver);
            lossOver = this.evaluate(getLossOver);
            goals = this.evaluate(getGoalDifference);
            points = this.evaluate(getPoints);
            teams = this.evaluate(getTeams);
            amountteams = this.evaluate(getTeamsPerLeague);
            amountEachEvent = [];

            var league = this.evaluate(getLeague);
            var country = this.evaluate(getCountry);
            var season = this.evaluate(getSeason);

            if(events != null){
               var temp = -1;
                for(var x=0; x<amountteams.length; x++){
                  currentAmount = Number(amountteams[x]);
                  if((currentAmount > temp) && (x < (amountteams.length-1))){
                    temp = Number(amountteams[x]);
                  }
                  else if(x == (amountteams.length-1)){
                    amountEachEvent.push(Number(amountteams[x]) + 1);
                    temp = -1;
                  }
                  else{
                    amountEachEvent.push(temp + 1);
                    this.echo('Pushed Value ' + temp);
                    temp = -1;
                  }
                }

              for (var j = 0; j < events.length; j++) {
                this.echo('<tgroup cols="9">');
                this.echo('<thead>');
                this.echo('<row> Liga '+ league + ' ' + events[j]+'</row>');
                this.echo('<row>');
                this.echo('<entry>Plazierung</entry><entry>Saison</entry><entry>Liga</entry><entry>Land</entry><entry>Team</entry><entry>Siege</entry><entry>Niederlagen</entry><entry>Tore</entry><entry>Punkte</entry>');
                this.echo('</row>');
                this.echo('</thead>');
                this.echo('<tbody>');
                              
                if(teams != null && league != null && country != null && season != null){
                  if(j == 0){
                    for (var i = 0; i < amountEachEvent[j]; i++) {
                      this.echo('<row>');
                      this.echo('<entry>'+ (i+1) +'</entry>' + '<entry>'+ season +'</entry>' + '<entry>'+ league +'</entry>' + '<entry>'+ country +'</entry>' +'<entry>'+ teams[i] +'</entry>' +'<entry>'+ wins[i] +'</entry>' +'<entry>'+ loss[i] +'</entry>' +'<entry>'+ goals[i] +'</entry>' +'<entry>'+ points[i] +'</entry>');
                      this.echo('</row>');
                    };
                  }
                  else{
                    beginCounter = 0;
                    maxCounter = 0;
                    internCounter = 1;
                    for (var i = 0; i <= j; i++) {
                      maxCounter += Number(amountEachEvent[i]);
                      if(i < j){
                        beginCounter = maxCounter;
                      }
                      this.echo('maxCounter = ' + maxCounter);
                    };
                    for (var i = beginCounter; i < maxCounter; i++) {
                      this.echo('<row>');
                      this.echo('<entry>'+ internCounter +'</entry>' + '<entry>'+ season +'</entry>' + '<entry>'+ league +'</entry>' + '<entry>'+ country +'</entry>' +'<entry>'+ teams[i] +'</entry>' +'<entry>'+ wins[i] +'</entry>' +'<entry>'+ loss[i] +'</entry>' +'<entry>'+ goals[i] +'</entry>' +'<entry>'+ points[i] +'</entry>');
                      this.echo('</row>');
                      internCounter++;
                    };
                  }
                  this.echo('</tbody>');
                  this.echo('</tgroup>');
                }
            };
          }
        });
    });
    

});

casper.run();


