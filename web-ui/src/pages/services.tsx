import {Typography} from "@mui/material";
import {useAppSelector} from "../core/redux";

const Services = () => {
    const {appInfo, isLoading, error} = useAppSelector(state => state.baseReducer);

    return (
        <div>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {appInfo.services.map(service => (
                <Typography>
                    {service.name}
                </Typography>
            ))}
        </div>
    );
};

export default Services;