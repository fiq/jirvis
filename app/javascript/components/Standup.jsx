import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const lightTheme = createTheme({ palette: { mode: 'light' } });


export default (props) => {
    if (!props.issueId) {
        props.issueId = "AV-2";
    }
    const [issue, setIssue] = React.useState({key:""});
    const [parent, setParent] = React.useState();
    const [sprintName, setSprintName] = React.useState();
    const [sprintGoal, setSprintGoal] = React.useState();
    const [assignee, setAssignee] = React.useState();
    const [issueStatus, setIssueStatus] = React.useState();
    const [avatarUrl, setAvatarUrl] = React.useState();
    const [description, setDescription] = React.useState();
    const [summary, setSummary] = React.useState();


    const fetchProjectIssues = async () => {
        // guard for when props not set
        // TODO simplify
        if (props.issueId) {
            const jiraIssueId = props.issueId.toUpperCase();
            const response = await fetch(
                `/api/v1/issues/${jiraIssueId}`
            );
            const body = await response.json();
            setIssue(body);
            console.log(body);
            if (body.fields.parent) {
                setParent(body.fields.parent);
            }
            if (body.fields.assignee) {
                setAssignee(body.fields.assignee.displayName);
                setAvatarUrl(body.fields.assignee.avatarUrl);
            }

            if (body.fields.status) {
                setIssueStatus(body.fields.status.name);
            }

            if (body.fields.summary) {
                setSummary(body.fields.summary);
            }

            if (body.fields.description) {
                setDescription(body.fields.description);
            }
        
        }

        return ()=>console.log("Unmounting project");
    };
    React.useEffect( () => {
        (async ()=>fetchProjectIssues())();
    }, [props.issueId]);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                <Box>
                    <Stack direction="row" spacing={2}>
                        {avatarUrl &&
                            <Avatar alt={issue.key} src={avatarUrl}/>
                        }    
                    <table>
                        <tr><td>Key:</td><td>{issue.key}</td></tr>
                        <tr><td>Assignee</td><td>{assignee}</td></tr>
                        <tr><td>Status</td><td>{issueStatus}</td></tr>
                        <tr><td>Summary:</td><td>{summary}</td></tr>
                        <tr><td>Description:</td><td>{description || "Please update the user story"}</td></tr>
                    </table>
                    </Stack>
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    );
};

