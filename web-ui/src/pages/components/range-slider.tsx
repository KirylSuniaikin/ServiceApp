import * as React from 'react';
import {Box} from "@mui/material";
import Slider from "@mui/material/Slider";

const MIN = 0;
const MAX = 1000;
const minDistance = 100;


function valuetext(value: number){
    return `${value} $`;
}

export default function RangeSlider() {
    const[value, setValue] = React.useState<number[]>([MIN,MAX]);

    const handleChange = (event: Event, newValue: number | number[],activeThumb: number) => {
        if (!Array.isArray(newValue)){
            return;
        }

        if(newValue[1] - newValue[0] < minDistance) {
            if(activeThumb===0) {
                const clamped = Math.min(newValue[0], MAX - minDistance);
                setValue([clamped, clamped+minDistance]);
            }
            else{
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped-minDistance, clamped]);
            }
        }
        else{
            setValue(newValue as number[]);
        }
    };

    const marks = [
        {
            value: 0,
            label: '0$',
        },
        {
            value: 1000,
            label: '1000$',
        },
        {
            value: MIN,
            label: '',
        },
        {
            value: MAX,
            label: '',
        },
    ];

    return(
        <Box sx={{width: 250,  ml: 30}}>
            <Slider
                getAriaLabel={() => 'Budget range'}
                value={value}
                onChange={handleChange}
                marks={marks}
                step={50}
                disableSwap
                valueLabelDisplay="auto"
                max={1000}
                getAriaValueText={valuetext}
            />
        </Box>
    );
}