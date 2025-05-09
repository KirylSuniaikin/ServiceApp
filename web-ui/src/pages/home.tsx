import {useAppDispatch, useAppSelector} from "../core/redux";
import {Button, Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {loadAppInfo} from "../core/actions";
import CreateTicketDialog from "./components/create-ticket-popup";
import ReplyForm from "./components/reply-form";
import ReplyPopup from "./components/reply-popup";
import Box from "@mui/material/Box";


const Home = () => {
    const dispatch = useAppDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {appInfo, isLoading, error} = useAppSelector(state => state.baseReducer);

    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(loadAppInfo());
        console.log('dispatched')
    },[])

    const handleButtonClick = (serviceName: string) => {
        console.log('dialog open')
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {appInfo.services.map((service, index) => (
                <Button
                    key={index}
                    variant="contained"
                    style={{margin: '5px'}}
                    onClick={() => handleButtonClick(service.name)}
                >
                    {service.name}
                </Button>
            ))}
            <Box>
                {appInfo.subServices.map((subService, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        style={{margin: '5px'}}
                    >
                        {subService.name}
                    </Button>
                ))}
            </Box>
            <CreateTicketDialog isOpen={isDialogOpen} onClose={handleClose}/>
            <Container sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Task Response Form
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsPopupOpen(true)}
                    sx={{ display: 'block', mx: 'auto' }}
                >
                    Open Form
                </Button>
            </Container>
            <ReplyPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <ReplyForm />
            </ReplyPopup>
        </div>
    );
}

export default Home;