// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');
const http = require('https');

const config = {
    logging: true,
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
        var context = this;
        var sentenceWithCapital = sentence.value.replace(/\b\w/g, l => l.toUpperCase())
        var title = 'Correction of: ' + sentenceWithCapital;
        var cardContent = '';
        var objectArray = [];
        var url = 'https://languagetool.org/api/v2/check?text=' + sentenceWithCapital + '&language=en-US';
        
        var req = http.get(url, function(res){
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function(){
                body = body.replace(/\\\"/g,'');
                var content = JSON.parse(body);
                objectArray = content.matches; // an array of objects
            var numberOfMistakes = objectArray.length;
            console.log('' +numberOfMistakes);
            console.log(objectArray);
            var i = 0;
        
            for (i = 0; i < numberOfMistakes; i++) {
                    cardContent += '->' + objectArray[i].message;
                    cardContent += '\n';
                }
            if (cardContent == '') {
                context.showSimpleCard(title, 'Your sentence is perfect!!!').tell('Your sentence is gramatically correct. There is no need for correction. ');
            
            } else {
                context.showSimpleCard(title, cardContent).tell('I have sent the corrections to the alexa application on your phone!');
                
            }
                
            }); 
                
            });
    
            req.on('error', function(err){
            this.showSimpleCard('there is an error', 'error').tell('There is an error');
            });

            },
}); 

module.exports.app = app;