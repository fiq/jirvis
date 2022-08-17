import React, { useState } from "react";

const Jirvis = () => {
    const [capture, setCapture] = useState("<<No words detected>>");
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
        event.preventDefault();
        const indexOfCurrentCapture = event.results.length - 1;
        const capturedWords = event.results[indexOfCurrentCapture];
        setCapture( capturedWords[0].transcript );
        console.log("In recognition");
        console.log("Got " + capturedWords[0]);
    };

    const startRecognition = () => {
        recognition.start();
        recognition.onresult = showSpeech
    };

    return (
        <div>
            Please provided a command from {commands.join(", ")}
            <button onClick={startRecognition}>Capture Speech</button>
            <br />
            <div>{capture}</div>
        </div>

    )
}

export default Jirvis;
