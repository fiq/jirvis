import React, { useState, useEffect } from "react";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Jirvis from "./Jirvis";
import { Button, Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const greeting = "Welcome to Jirvis. Let's continuously deliver heroics.";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const App = () => {
    const synth = window.speechSynthesis;
    const [project, setProject] = useState("AV");
    const updateProject = (e) => {
        e.preventDefault();
        console.log(e);
        // FIXME - don't use the DOM
        setProject(document.getElementById("projectId").value);
    }


    useEffect(() => {
        setTimeout(() => {
            synth.cancel();
            console.log("Speaking");
            const welcomeMessage = new SpeechSynthesisUtterance(greeting);
            //welcomeMessage.voice = synth.getVoices()[8];
            //welcomeMessage.volume = 0.8;
            welcomeMessage.volume = 1;
            //synth.cancel()
            synth.speak(welcomeMessage);
            console.log(synth.speaking);
        }, 6000);

        //synth.cancel();
    })

    return (
        <Box sx={{ m: 2, borderRadius: '16px', border: 1, boarderColor: 'primary.main' }}>
            <ThemeProvider theme={darkTheme}>
                <Grid container spacing={2}>
                    <Grid container spacing={1}>
                        <TextField required id="projectId" label="Enter Project Key" defaultValue="AV" />
                        <Button variant="contained" onClick={updateProject}></Button>
                    </Grid>
                    <Grid item xs={4} md={2}><Jirvis projectId={project} /></Grid>
                </Grid>
            </ThemeProvider>

        </Box>
    );
};

export default App;
