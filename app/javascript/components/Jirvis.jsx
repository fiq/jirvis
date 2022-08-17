import React from "react";

const Jirvis = () => {
    let capture = ""
    let captureIndex = 0;
    const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    const commands = ['testing', 'standup', 'offline', 'comment', "close issue"];
    const grammar = `#JSGF V1.0; grammar jirvis; public <jirvis> = ${commands.join(' | ')};`
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    const showSpeech = (event) => {
        capture = event.results[captureIndex][0].transcript;
        console.log("In recognition");
        console.log("Got " + capture);
        captureIndex++;
    };

    const startRecognition = () => {
        captureIndex = 0;
        recognition.start();
        recognition.onresult = showSpeech
    };

    return (
        <div>
            Please provided a command from {commands.join(", ")}
            <button onClick={startRecognition}>Capture Speech</button>
            <br />
            <div>{capture}
            </div>
        </div>

    )
}

export default Jirvis;
