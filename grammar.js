/*  Justin Chan Yung Shing 05/02/2018 
    For opearlo Intern Interview 
    A simple proofreading Alexa skills kit 
    API used: http://wiki.languagetool.org/public-http-api -- It is a free service. You do not need an API key to use this service
*/

'use strict';
const http = require('https');

exports.handler = function(event,context) {

    var request = event.request;
    var session = event.session;
    
     if(!event.session.attributes) {
      event.session.attributes = {};
    }
  
    /* 3 types of requests
    i)   LaunchRequest      
    ii)  IntentRequest      
    iii) SessionEndedRequest */
    
    if (request.type === "LaunchRequest") {
        let options = {};
        options.speechText = "Welcome to this proof reading app. I am capable of correcting the mistakes that you make in a sentence or a paragraph. How may I help you";
        options.endSession = false;
        context.succeed(buildResponse(options));
    }
        
    else if (request.type === "IntentRequest" ) {
        let options = {};
        
        if (request.intent.name === "ProofreadIntent") {
        
        let sentence = request.intent.slots.sentence.value; 
        getTranslation(sentence, function(outcomes,err){
            if (err) {
                context.fail(err);
            } else {
                options.cardTitle = "Correction of: " + sentence;
                var numberOfMistakes = outcomes.length;
                options.cardContent = "";
                var i = 0;
                for (i = 0; i < numberOfMistakes; i++) {
                    options.cardContent += "->" + outcomes[i].message;
                    options.cardContent += "\n";
                }
                options.speechText = "I have sent the correction to the alexa application on your phone. Thank you for using this application.";
                options.reprompText = "is there anything that I can help you?"
                options.endSession = false;
                context.succeed(buildResponse(options));
            }
        });
    }}
    else if (request.type === "SessionEndedRequest"){
        // The application shuts down automatically if the user doesn't say anything. 
    }
     else {
        throw"Unknown intent type";
    }

} 

function buildResponse(options) {
    
var response = {
    version: "1.0",
    response: {
    outputSpeech: {
      type: "PlainText",
      text: options.speechText
    },
    "shouldEndSession": options.endSession}
};
    
    if(options.cardTitle) {
        response.response.card = { 
        type: "Simple",
        title: options.cardTitle ,
        content: options.cardContent
        }
    }
    
    if(options.reprompText) {
        response.response.reprompt = {
            outputSpeech: {
            type:"PlainText",
            text: options.reprompText
        }
        };
    }
    
    return response;
}

function getTranslation(sentence, callback) {
    var url = "https://languagetool.org/api/v2/check?text=" + sentence + "&language=en-US"
    var req = http.get(url, function(res){
    var body = "";
    
    res.on('data', function(chunk) {
        body += chunk;
    });
    
    res.on('end', function(){
        console.log(body + "\n"); // for testing
        body = body.replace(/\\\"/g,'');
        console.log(body + "\n"); // for testing
        var content = JSON.parse(body);
        console.log(content);  // for testing
        callback(content.matches); // an array of objects
    }); 
    
    });
    
    req.on('error', function(err){
    callback('', err);
    });
    
}