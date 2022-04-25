import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useCryptoContext } from '../../Context'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { numberWithCommas } from '../Banner/Carousel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// Styles
const drawer_container = {
    width: 300,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#9e9e9e',
}

const watchlistStyle = {
    flex: 1,
    width: '100%',
    backgroundColor: '#bfbfbf',
    borderRadius: '5px',
    padding: '15px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    overflow: 'scroll',
    margin: '15px 0',
}

export default function SideBar() {
    const { user, setAlert, watchlist, coins, symbol } = useCryptoContext()
    const [state, setState] = React.useState({
        right: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }
        setState({ ...state, [anchor]: open })
    }
    const logoutHandler = async () => {
        try {
            await signOut(auth)
            setAlert({
                message: 'Logged out successfully.',
                severity: 'success',
                open: true,
            })
        } catch (err) {
            setAlert({
                message: err.message,
                severity: 'error',
                open: true,
            })
        }
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        sx={{ mx: '1rem', cursor: 'pointer' }}
                        alt={user ? user.displayName : 'User'}
                        src={
                            user
                                ? user.photoURL
                                : 'https://picsum.photos/200/300?random=1'
                        }
                        onClick={toggleDrawer(anchor, true)}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div style={drawer_container}>
                            <Avatar
                                alt={user.displayName || 'User'}
                                src={
                                    user
                                        ? user.photoURL
                                        : 'https://picsum.photos/200/300?random=1'
                                }
                                sx={{ width: 200, height: 200, mx: 'auto' }}
                            />
                            <span
                                style={{
                                    width: '100%',
                                    fontSize: '2rem',
                                    textAlign: 'center',
                                    wordWrap: 'break-word',
                                    fontWeight: 'bold',
                                }}
                            >
                                {user ? user.displayName : 'Guest User'}
                            </span>
                            <Button
                                variant='contained'
                                color='error'
                                sx={{ my: '10px ' }}
                                onClick={logoutHandler}
                            >
                                LOGOUT
                            </Button>

                            <div style={watchlistStyle}>
                                <span style={{ fontSize: '1.5rem' }}>
                                    Watchlist
                                </span>
                                {coins.map((coin) => {
                                    if (watchlist.includes(coin.id)) {
                                        return (
                                            <div
                                                key={coin.id}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: 'grey',
                                                        padding: '7px',
                                                        width: '200px',
                                                        gap: '10px',
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-evenly',
                                                        alignItems: 'center',
                                                        boxShadow:
                                                            '0px 0px 5px grey',
                                                        flexDirection: 'column',
                                                        borderRadius: '5px',
                                                    }}
                                                >
                                                    <span>{coin.name}</span>
                                                    <span>
                                                        {symbol}{' '}
                                                        {numberWithCommas(
                                                            coin.current_price.toFixed(
                                                                2
                                                            )
                                                        )}
                                                        <DeleteForeverIcon
                                                            sx={{
                                                                cursor: 'pointer',
                                                                ml: '10px',
                                                                verticalAlign:
                                                                    'text-bottom',
                                                                '&:hover': {
                                                                    color: 'red',
                                                                },
                                                            }}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}
