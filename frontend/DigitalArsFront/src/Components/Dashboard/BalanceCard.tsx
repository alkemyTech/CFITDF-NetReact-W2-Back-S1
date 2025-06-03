import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const BalanceCard = ({ saldo, onSendMoney }: { saldo: number, onSendMoney: () => void }) => {
    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h5" component="div">
                        Saldo disponible
                    </Typography>
                </Box>
                <Typography variant="h4" color="text.primary" gutterBottom>
                    ${saldo.toFixed(2)}
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={onSendMoney}
                >
                    Enviar dinero
                </Button>
            </CardContent>
        </Card>
    );
};

export default BalanceCard;