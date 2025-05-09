import {useAppDispatch, useAppSelector} from "../core/redux";
import {Typography} from "@mui/material";
import {useEffect} from "react";
import {loadMyTicketInfo} from "../core/actions";
import CardPrint from "./components/ticket-card"


const MyTickets = () => {
    const dispatch = useAppDispatch();
    const {myTickets, isLoading, error} = useAppSelector(state => state.myTicketReducer);

    useEffect(() => {
        dispatch(loadMyTicketInfo());
        console.log('dispatched')
    },[])
    return (
        <div>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {myTickets.map(ticket => (
                <CardPrint {...ticket}/>
            ))}
        </div>
    );
};

export default MyTickets;