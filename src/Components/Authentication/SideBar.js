import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Avatar from '@mui/material/Avatar'
import { useCryptoContext } from '../../Context'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

// Styles
const drawer_container = {
    width: 300,
    padding: 25,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#9e9e9e',
}

const watchlist = {
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
    const { user, setAlert } = useCryptoContext()
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

    const logoutHandler = () => {
        setAlert({
            message: 'Logged out successfully',
            severity: 'success',
            open: true,
        })
    }
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        sx={{ mx: '1rem', cursor: 'pointer' }}
                        alt={user ? user.name : 'User'}
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
                                alt='Remy Sharp'
                                src='https://picsum.photos/200/300?random=1'
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
                                {user ? user.name : 'Users'}
                            </span>
                            <Button
                                variant='contained'
                                color='error'
                                onClick={logoutHandler}
                            >
                                LOGOUT
                            </Button>

                            <div style={watchlist}>
                                <span style={{ fontSize: '1.5rem' }}>
                                    Watchlist
                                </span>
                            </div>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )
}
