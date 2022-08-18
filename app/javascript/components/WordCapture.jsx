import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const lightTheme = createTheme({ palette: { mode: 'light' } });


const Item = styled(Paper)(() => ({
    ...lightTheme.typography.body2,
    textAlign: 'center',
    color: lightTheme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

export default (props) => (
    <Item key={4} elevation={4}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.word}
                </Typography>
            </CardContent>
        </Card>
    </Item>
)
