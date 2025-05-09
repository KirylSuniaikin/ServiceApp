import React, { useState } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Button, TextField, Stepper, Step, StepLabel, IconButton, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Step1: React.FC<{ handleNext: () => void, handleClose: () => void }> = ({ handleNext, handleClose }) => {
    return (
        <div>
            <DialogTitle>Description
                <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNext}>Next</Button>
            </DialogActions>
        </div>
    );
};

const Step2: React.FC<{ handleBack: () => void, handleNext: () => void, handleClose: () => void }> = ({ handleBack, handleNext, handleClose }) => {

    return (
        <div>
            <DialogTitle>Location
                <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Location"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Number"
                    type="number"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                        inputProps: { min: 0, max: 100 }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Finish</Button>
            </DialogActions>
        </div>
    );
};

const CreateTicketDialog: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Description', 'Location'];

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleClose = () => {
        onClose();
        setActiveStep(0);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && <Step1 handleNext={handleNext} handleClose={handleClose} />}
            {activeStep === 1 && <Step2 handleBack={handleBack} handleNext={handleClose} handleClose={handleClose} />}
        </Dialog>
    );
};

export default CreateTicketDialog;