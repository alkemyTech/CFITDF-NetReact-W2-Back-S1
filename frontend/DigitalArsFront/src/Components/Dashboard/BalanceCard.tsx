import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SendIcon from '@mui/icons-material/Send';
import SavingsIcon from '@mui/icons-material/Savings';

const BalanceCard = ({
    saldo,
    onSendMoney,
    onInvest,
}: {
    saldo: number;
    onSendMoney: () => void;
    onInvest: () => void;
}) => {
    return (
        <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4, borderRadius: 4, boxShadow: 3, width: '100%' }}>
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

                <Box display="flex" justifyContent="flex-start" gap={2} mt={2} flexWrap="wrap">
                    <Button
                        variant="contained"
                        onClick={onSendMoney}
                        endIcon={<SendIcon />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 3,
                            fontWeight: 600,
                            minWidth: 160,
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Enviar dinero
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onInvest}
                        endIcon={<SavingsIcon />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 3,
                            fontWeight: 600,
                            minWidth: 160,
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            '&:hover': {
                                borderColor: 'primary.dark',
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        Invertir ahora
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BalanceCard;
