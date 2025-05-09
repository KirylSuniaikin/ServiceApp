import Box from "@mui/material/Box";
import * as React from 'react';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Button, Chip, MenuItem, Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../core/redux";
import {loadTicketInfo} from "../../core/actions";

const MIN = 0;
const MAX = 10000;
const minDistance = 100;

function valuetext(value: number){
    return `${value} $`;
}



const Filters = () => {
    const {appInfo, isLoading, error} = useAppSelector(state => state.baseReducer);
    const dispatch = useAppDispatch();
    const [filterName, setFilterName] = React.useState<string[]>([]);
    const[value, setValue] = React.useState<number[]>([MIN,MAX]);
    const handleChange = (event: SelectChangeEvent<typeof filterName>) => {
        const {target: {value}} = event;
         setFilterName(
             typeof value === 'string' ? value.split(',') : value,

         );
    }
    const handleSliderChange = (event: Event, newValue: number | number[],activeThumb: number) => {
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
            value: 10000,
            label: '10000$',
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
    <Box sx={{ bgcolor:'lightgrey', borderRadius: 3, ml: 70}}
    height={70}
        width={600}
    >
        <div>
            <FormControl sx={{ m: 1, width: 200, display:'flex', pb: 1}}>
                <InputLabel id="filter-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="filer-multiple-select-label"
                    id="filer-multiple-select"
                    multiple
                    value={filterName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                >
                    {appInfo.subServices.map((subService) =>
                        <MenuItem
                            key={subService.name}
                            value={subService.name}
                        >
                            {subService.name}
                        </MenuItem>
                    )}
                </Select>
                <Box sx={{width: 250,  ml: 30}}>
                    <Slider
                        getAriaLabel={() => 'Budget range'}
                        value={value}
                        onChange={handleSliderChange}
                        marks={marks}
                        step={50}
                        disableSwap
                        valueLabelDisplay="auto"
                        max={10000}
                        getAriaValueText={valuetext}
                    />
                </Box>
                <Button onClick={() => dispatch(loadTicketInfo({ maxBudget: value[1],minBudget: value[0], serviceType: filterName}))}>FILTER</Button>
            </FormControl>
        </div>
    </Box>
);
}

export default Filters;