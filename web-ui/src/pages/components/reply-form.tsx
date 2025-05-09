import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import {initialUserState} from "../../reducers/user-slice";
// import {useSubmitResponseMutation} from "../../core/actions";


const ReplyForm: React.FC = () => {
    const [budget, setBudget] = useState<number>(0);
    const [finishDate, setFinishDate] = useState<string>('');
    const [additionalInfo, setAdditionalInfo] = useState<string>('');
    // const [submitResponse] = useSubmitResponseMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = {

            taskerId: initialUserState.user.id,
            ticketId: '470ce1f6-f210-4fab-b4d2-e74d7e8d7294',
            budget,
            finishDate: new Date(finishDate),
            responseStatus: 'O',
        };
        // await submitResponse(response);
        console.log('ResponseTO: ' + response.taskerId);
        console.log('ResponseTO: ' + response.ticketId);
        console.log('ResponseTO: ' + response.budget);
        console.log('ResponseTO: ' + response.finishDate);
        console.log('ResponseTO: ' + response.responseStatus);
    };

    return (
        <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Budget Counteroffer"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Potential Term 1"
                        type="date"
                        value={finishDate}
                        onChange={(e) => setFinishDate(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Additional Info"
                        type="text"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReplyForm;
