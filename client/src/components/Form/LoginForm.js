import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './LoginForm.css'
import "./SignUpForm.css"

import { useHistory } from "react-router-dom";

const theme = createTheme();


// https://csci-331-snow-project.herokuapp.com
async function loginUser(credentials) {
    console.log(credentials)
    const deployURL ='https://csci-331-snow-project.herokuapp.com/login'
    const localURL = '/login'
    return fetch(localURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}



function LoginForm({ Login, error, setToken }) {
    let history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //         email,
    //         password
    //     });
    //     setToken(token);

    //     // history.push("/api");
    //     // window.location.reload(false);
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        let userInfo = {
            email: data.get('email'),
            password: data.get('password'),
        }
        const token = loginUser(userInfo);
        token.then((response) => {
            setToken(response);
            history.push("/api");
            window.location.reload(false);
            console.log(userInfo);
        })




    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container id="signinForm" component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "rgb(0 183 255)" }}>
                            <AcUnitIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sumbit
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/sign-up" variant="body2">
                                        Need to create an account? Sign up.
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default LoginForm;
