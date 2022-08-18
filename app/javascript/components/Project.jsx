import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const lightTheme = createTheme({ palette: { mode: 'light' } });


export default (props) => {
    const [projectInfo, setProjectInfo] = React.useState({key:""});
    const fetchProject = async () => {
        // guard for when props not set
        // TODO simplify
        if (props.projectId) {
            const response = await fetch(
                `/api/v1/projects/${props.projectId}`
            );
            const body = await response.json();
            setProjectInfo(body);
            console.log(body)
        }

        return ()=>console.log("Unmounting project");
    };
    React.useEffect( () => {
        (async ()=>fetchProject())();
    }, [props.projectId]);


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
                    <Box>
                    <table>
                        <tr><td>Key:</td><td>{projectInfo.key}</td></tr>
                        <tr><td>Name:</td><td>{projectInfo.name}</td></tr>
                        <tr><td>Description:</td><td>{projectInfo.description}</td></tr>
                    </table>
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    );
};

