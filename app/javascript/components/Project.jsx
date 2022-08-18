import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const lightTheme = createTheme({ palette: { mode: 'light' } });


export default (props) => {
    const [projectInfo, setProjectInfo] = React.useState({});
    const fetchProject = async () => {
        // guard for when props not set
        // TODO simplify
        if (props.projectId) {
            const response = await fetch(
                "/api/v1/projects/"
            );
            console.log(response);
            const body = response.json();
            setProjectInfo(body);
        }

        return ()=>console.log("Unmounting project");
    };
    React.useEffect( () => {
        (async ()=>fetchProject())();
    });


    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.projectId}
                </Typography>
            </CardContent>
        </Card>
    );
};

