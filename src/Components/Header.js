import React from 'react'
import AuthModal from './Authentication/AuthModal'
import {
    Box,
    AppBar,
    MenuItem,
    Select,
    Toolbar,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useCryptoContext } from '../Context'
import SideBar from './Authentication/SideBar'

const Header = () => {
    const navigate = useNavigate()
    const { currency, setCurrency, user } = useCryptoContext()

    return (
        <Box sx={{ flexGrow: 0.3 }}>
            <AppBar position='static' sx={{ backgroundColor: '#050504' }}>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        onClick={() => navigate('/')}
                        className='title'
                    >
                        CryptoX
                    </Typography>

                    <Select
                        variant='outlined'
                        className='select_currency'
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={currency}
                        sx={{ width: 100, height: 40, marginLeft: 15 }}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={'INR'}>INR</MenuItem>
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                    </Select>
                    {user ? <SideBar /> : <AuthModal />}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
