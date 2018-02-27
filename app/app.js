// =================================================================================
// App Configuration
// =================================================================================
const {
    App
} = require('jovo-framework');
const http = require('https');

const config = {
    logging: true,
    intentMap: {
        'AMAZON.HelpIntent': 'HelpIntent',
        'AMAZON.StopIntent': 'StopIntent',
        'AMAZON.CancelIntent': 'CancelIntent',
    },
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.ask('Welcome to this proof reading app. I am capable of correcting the mistakes that you make in a sentence or a paragraph. How may I help you', 'how may I help you');
    },

    'ProofreadIntent': function(sentence) {

        if (sentence.value === undefined) {
            this.ask("Your haven't provided me with a sentence", "is there anything that I can help you with?");
        } else {
            var context = this;
            var sentenceWithCapital = sentence.value.replace(/\b\w/g, l => l.toUpperCase());
            var title = 'Correction of: ' + sentenceWithCapital;
            var cardContent = '';
            var objectArray = [];
            var url = 'https://languagetool.org/api/v2/check?text=' + sentenceWithCapital + '&language=en-US';

            var req = http.get(url, function(res) {
                var body = '';
                res.on('data', function(chunk) {
                    body += chunk;
                });

                res.on('end', function() {
                    body = body.replace(/\\\"/g, '');
                    var content = JSON.parse(body);
                    objectArray = content.matches; // an array of objects
                    var numberOfMistakes = objectArray.length;
                    console.log('' + numberOfMistakes);
                    console.log(objectArray);
                    var i = 0;

                    for (i = 0; i < numberOfMistakes; i++) {
                        cardContent += '->' + objectArray[i].message;
                        cardContent += '\n';
                    }
                    if (cardContent === '') {
                        context.showSimpleCard(title, 'Your sentence is perfect!!!').tell('Your sentence is gramatically correct. There is no need for correction. ');

                    } else {
                        var temp = (numberOfMistakes == 1) ? ' mistake' : ' mistakes';
                        context.showSimpleCard(title, cardContent).tell('You have made ' + numberOfMistakes + temp + ' in your sentence. ' + 'I have sent the corrections to the alexa application on your phone!');

                    }

                });

            });

            req.on('error', function(err) {
                this.showSimpleCard('there is an error', 'error').tell('There is an error');
            });
        }

    },

    'HelpIntent': function() {
        var speech = "This is an application that can detect the mistakes in your sentences. To use this application, simply use the command proofread. " +
            "  For example, proofread I was happy. Our application will tell you how many mistakes you have made in your sentence and subsequently the corrections will be sent directly to the alexa application on your phone.";
        this.ask(speech, "is there anything else that I can help you with?");

    },

    'StopIntent': function() {
        var speech = "The application has been stopped. Thank you for using this application.";
        this.tell(speech);
    },

    'CancelIntent': function() {
        var speech = "The process has been cancelled. Thank you for using this application.";
        this.tell(speech);
    }

});

module.exports.app = app;