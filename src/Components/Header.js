import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCryptoContext } from '../Context'

const Header = () => {
    const navigate = useNavigate()
    const { currency, setCurrency } = useCryptoContext()

    return (
        <AppBar color='transparent' position='static' sx={{ padding: '1rem' }}>
            <Container>
                <Toolbar>
                    <Typography
                        variant='h4'
                        onClick={() => navigate('/')}
                        sx={{
                            fontFamily:
                                'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                            cursor: 'pointer',
                        }}
                    >
                        Crypto<span className='title_span'>Pad</span>
                    </Typography>

                    <Select
                        labelId='demo-select-small'
                        id='demo-select-small'
                        variant='outlined'
                        label='Currency'
                        value={currency}
                        className='select_currency'
                        sx={{ color: 'white' }}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={'INR'}>INR</MenuItem>
                        <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
