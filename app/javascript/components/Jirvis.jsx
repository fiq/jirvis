import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WordCapture from "./WordCapture";
import { Grid } from "@mui/material";
//import MicIcon from '@mui/icons-material/Mic';
import Project from "./Project"
import Standup from "./Standup"


const Jirvis = (props) => {
    const [capture, setCapture] = useState("<<No words detected>>");
    const [issueId, setIssueId] = useState();
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

    //const re=/story(\\D+)\-?(\\d+)/;
    const re = /story(.*)$/;
    const updateIssue = (normalisedIssue) => {    
        const issueMatch = normalisedIssue.match(re);
        console.log("tested against " + normalisedIssue);

        if (issueMatch && issueMatch.length) {
            const issueIdDetected = issueMatch[1].toUpperCase();
            console.log("Found issue id: " + issueIdDetected);
            setIssueId(issueIdDetected);
        }
    };

    const commandDispatcher = (words_heard) => {
        console.log("In dispatcher" + words_heard);
        const normalised = words_heard.toLowerCase().replaceAll(" ", "");
        console.log("Normalised to " + normalised)
        if (normalised.match("story")) {
            console.log("In first match");
            updateIssue(normalised)
        }
    };

    const showSpeech = (event) => {
        //event.preventDefault();
        const indexOfCurrentCapture = event.results.length - 1;
        const capturedWords = event.results[indexOfCurrentCapture];
        const capture = capturedWords[0].transcript
        setCapture(capture);
        console.log("In recognition");
        console.log("Got " + capture);
        const synth = window.speechSynthesis;
        synth.speak(new SpeechSynthesisUtterance("I heard you say: " + capture));
        console.log("Dispatching");
        commandDispatcher(capture);
    };

    const startRecognition = () => {
        recognition.start();
        recognition.onresult = showSpeech
    };

    return (
        <Grid container spacing={3}>
            <Grid>
                <Box sx={{
                    width: 800,
                    height: 400,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    m: 4,
                }}>Please provided a command from {commands.join(", ")}<br />

                    <Button variant="contained" onClick={startRecognition}>Capture Speech</Button>
                    {issueId &&
                        <Box>
                            <Standup issueId={issueId} />
                        </Box>
                    }

                </Box>
            </Grid>
            <Grid>
                <WordCapture word={capture} />

            </Grid>
            <Grid>
                <Project projectId={props.projectId} />
            </Grid>
        </Grid >
    );
}

export default Jirvis;
