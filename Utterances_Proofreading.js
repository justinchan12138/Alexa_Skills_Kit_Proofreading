{
  "languageModel": {
    "intents": [
      {
        "name": "AMAZON.CancelIntent",
        "samples": [
          "no"
        ]
      },
      {
        "name": "AMAZON.HelpIntent",
        "samples": []
      },
      {
        "name": "AMAZON.StopIntent",
        "samples": []
      },
      {
        "name": "ProofreadIntent",
        "samples": [
          "Proofread {happy|sentence}",
          "proofread  {I am very very very very very very very very happy|sentence} "
        ],
        "slots": [
          {
            "name": "sentence",
            "type": "AMAZON.LITERAL"
          }
        ]
      }
    ],
    "invocationName": "proofreading"
  }
}