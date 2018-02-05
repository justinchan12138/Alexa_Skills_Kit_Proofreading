# Alexa_Skills_Kit_Proofreading

This is a simple Alexa Skills Kit that proofreads english sentences and Paragraphs. 

To open the application, say: Alexa, open profreading

To use this application to proofread your sentence(s), you can say: proofread {your sentence}. 

The application will send the correction(s) to the Alexa app on your phone (In the form of cards). It just makes it easier for you to see the mistakes in your sentences. 

You do not need an API key to use this application. The API I used is a free service. I also used AWS lambda to run the code. 

![proofread-pic](https://user-images.githubusercontent.com/25237239/35786846-fe1987f0-0a21-11e8-9703-37da9315fdae.jpg)


Service Requestion (Example):

{
  "session": {
    "new": true,
    "sessionId": "SessionId.38d6325f-6dc8-4e47-b1f3-e893ccfc558a",
    "application": {
      "applicationId": "amzn1.ask.skill.b67b3290-34d1-4157-90d6-b0f9fbaffb1f"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AFGAUEZBLOXANWVPXKQPYF6MZWFIEIKEF5DXPTQ3FESODEVTCRFXQUE44XQAA5KRXF4Q3APPSITTPKFFOHKJMLOY5XKRHVMGJ66ZIMXA7J7R5KEBEQRQQXGMFZVLTKKDKHH4XV36YRI2YH2SRBIO6CVIAEHLDWMIQ7PFDGR5ASDJAI7QIROTKEHC3RSDKVTIFDLM3MU2PY44GIQ"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.e8eda006-c618-4e69-8a3b-15d7aa54da3c",
    "intent": {
      "name": "ProofreadIntent",
      "slots": {
        "sentence": {
          "name": "sentence",
          "value": "today are very weid"
        }
      }
    },
    "locale": "en-US",
    "timestamp": "2018-02-05T03:12:19Z"
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.b67b3290-34d1-4157-90d6-b0f9fbaffb1f"
      },
      "user": {
        "userId": "amzn1.ask.account.AFGAUEZBLOXANWVPXKQPYF6MZWFIEIKEF5DXPTQ3FESODEVTCRFXQUE44XQAA5KRXF4Q3APPSITTPKFFOHKJMLOY5XKRHVMGJ66ZIMXA7J7R5KEBEQRQQXGMFZVLTKKDKHH4XV36YRI2YH2SRBIO6CVIAEHLDWMIQ7PFDGR5ASDJAI7QIROTKEHC3RSDKVTIFDLM3MU2PY44GIQ"
      },
      "device": {
        "supportedInterfaces": {}
      }
    }
  },
  "version": "1.0"
}


Service Request (Example):
{
  "version": "1.0",
  "response": {
    "outputSpeech": {
      "text": "I have sent the correction to the alexa application on your phone. Thank you for using this application.",
      "type": "PlainText"
    },
    "card": {
      "content": "->This sentence does not start with an uppercase letter\n->Possible spelling mistake found\n",
      "title": "Correction of: today are very weid"
    },
    "reprompt": {
      "outputSpeech": {
        "text": "is there anything that I can help you?",
        "type": "PlainText"
      }
    },
    "speechletResponse": {
      "outputSpeech": {
        "text": "I have sent the correction to the alexa application on your phone. Thank you for using this application."
      },
      "card": {
        "content": "->This sentence does not start with an uppercase letter\n->Possible spelling mistake found\n",
        "title": "Correction of: today are very weid"
      },
      "reprompt": {
        "outputSpeech": {
          "text": "is there anything that I can help you?"
        }
      },
      "shouldEndSession": false
    }
  },
  "sessionAttributes": {}
}


