import {useAppDispatch, useAppSelector} from "../core/redux";
import {Typography} from "@mui/material";
import React, {useEffect} from "react";
import {loadTicketInfo} from "../core/actions";
import CardPrint from "./components/ticket-card"

import Filters from "./components/filter";


const OpenTickets = () => {
    const dispatch = useAppDispatch();
    const {openTickets, isLoading, error} = useAppSelector(state => state.ticketReducer);

    useEffect(() => {
        dispatch(loadTicketInfo());
        console.log('dispatched')
    },[])
    return (
        <div>
            <Filters/>

            {<Filters/>}

            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {openTickets.map(ticket => (
                <CardPrint {...ticket}/>
            ))}
        </div>
    );
};

export default OpenTickets;