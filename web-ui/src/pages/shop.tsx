import React, { useEffect } from 'react';
import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../core/redux";
import Box from "@mui/material/Box";
import { loadAppInfo, packagePurchase} from "../core/actions";
import {PackageTO} from "../core/types";

const Shop: React.FC = () => {
    const dispatch = useAppDispatch();
    const { appInfo, isLoading, error } = useAppSelector(state => state.baseReducer);
    const { user } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(loadAppInfo());
        console.log('App info dispatched');
    }, [dispatch]);

    const handleButtonClick = (packageInfo: PackageTO, id: string) => {
        console.log("User is buying " + packageInfo.type + " package");
        dispatch(packagePurchase({packageInfo, id}));
    };

    return (
        <div>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {!isLoading && !error && appInfo.shopItems.map((packageInfo, index) => (
                <Button
                    key={index}
                    variant="contained"
                    style={{
                        display: 'flex',
                        backgroundColor: '#f0f0f0',
                        justifyContent: 'space-between',
                        width: '80%',
                        margin: '10px auto',
                        borderRadius: '8px',
                        padding: '12px',
                        transition: 'background-color 0.3s',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        color: '#333',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#d1d1d1';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    onClick={() => handleButtonClick(packageInfo, user.id)}
                >
                    <Box flexGrow={1} textAlign="left">
                        <Typography variant="body1" fontWeight="bold">{packageInfo.type}</Typography>
                        <Typography variant="body1" fontWeight="bold">Extra {packageInfo.activePer} Months</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" fontWeight="bold">{packageInfo.value} coins</Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary">for {packageInfo.price} BHD</Typography>
                    </Box>
                </Button>
            ))}
        </div>
    );
};

export default Shop;