import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./pages/components/app-router";
import NavBar from "./pages/components/nav-bar";
import {initReactI18next} from "react-i18next";
import i18next from "i18next";
import en from "./translations/en/en-translations.json";
import { Button, Container, Typography } from '@mui/material';
<<<<<<< HEAD
import { configureAmplify } from './cognito/cognito-config';
=======
>>>>>>> 5e41416 (Shop is added)


export default function App() {

    useEffect(() => {
        configureAmplify();
    }, []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        i18next.use(initReactI18next).init({
            lng: 'en',
            fallbackLng: 'en',
            debug: true,
            resources: {
                en: {
                    translation: en
                }
            },
        }).then(() => {
            setLoading(false);
        }).catch((error) => {
            console.error("i18next initialization failed:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <Typography>Loading...</Typography>
        );
    }

    return (
        <>
            <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
        </>
    );
}