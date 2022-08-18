import React, { useState } from "react";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Jirvis from "./Jirvis";
import { Button, Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';



const darkTheme = createTheme({ palette: { mode: 'dark' } });

const App = () => {
    const [project, setProject] = useState("AV");
    const updateProject = (e) => {
        e.preventDefault();
        setProject(e.target.elements.projectId.value);
    }

    return (
    <Box sx={{ m:2 }}>
    <ThemeProvider theme={darkTheme}>

    <Grid content spacing={2}>
    <Grid container spacing={1}>
        <TextField required id="projectId" label="Enter Project Key" defaultValue="AV"/>
        <Button variant="contained" onSubmit={updateProject}></Button>
    </Grid>            
    <Grid item xs={4} md={2}><Jirvis project={project}/></Grid>
    </Grid>
    </ThemeProvider>

    </Box>
    );
};

export default App;
