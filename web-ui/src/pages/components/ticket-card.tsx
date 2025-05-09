import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {TicketStatusEnum, UserTypeEnum} from "../../core/types";
import {Typography} from "@mui/material";
import {Card, CardContent, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../core/redux";
import {TicketTO} from "../../core/types";
import {markTicketAsDone} from "../../core/actions";
import {MY_SINGLE_TICKET_ROUTE} from "../../utils/consts";


const CardPrint: React.FC<TicketTO> = ({...ticket}) => {
    const dispatch = useAppDispatch();
    const {user, userIsLoading, userError, isAuth} = useAppSelector(state => state.userReducer);

    const handleDone = () => {
         dispatch(markTicketAsDone(ticket.id))
    }
    return (
        <Card variant="outlined">
            <CardContent>
                <div style={{
                    display: 'flex',
                    backgroundColor: 'lightgrey',
                    justifyContent: 'space-between',
                    width: '80%',
                    margin: '0 auto'
                }}>
                    <div style={{backgroundColor: 'grey', width: '20%', height: '50px'}}>
                        {/* Placeholder for photo */}
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant="h5">Sub Task: {ticket.subType}</Typography>
                        <Typography>Description: {ticket.description}</Typography>
                        <Typography>Budget: {ticket.budget}$ Target end: {ticket.finishDate} </Typography>
                        {ticket.ticketStatus == TicketStatusEnum.IN_PROGRESS &&
                            <div>
                                <Typography> Tasker: {ticket.tasker.name} </Typography>
                                <Button variant="contained" color="secondary">Chat</Button>
                            </div>
                        }
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end'}}>
                        <Button variant="contained" color="secondary">
                            {((user.type === UserTypeEnum.TASKER || user.type === UserTypeEnum.SIMPLE)
                                    && ticket.ticketStatus === TicketStatusEnum.OPEN) &&
                                <Link to={`/ticket/${ticket.id}`}>Reply</Link>
                            }
                            {user.type === UserTypeEnum.CUSTOMER && ticket.ticketStatus === TicketStatusEnum.OPEN &&
                                <Link to={MY_SINGLE_TICKET_ROUTE + `/${ticket.id}`}>
                                    Details
                                </Link>
                            }
                            {user.type === UserTypeEnum.CUSTOMER && ticket.ticketStatus === TicketStatusEnum.IN_PROGRESS &&
                                <Button
                                onClick={handleDone}>
                                    MARK AS DONE
                                </Button>
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardPrint;
