import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Login from './Login'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'black',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
    borderRadius:"10px"
}

export default function AuthModal() {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button
                variant='outlined'
                onClick={handleOpen}
                sx={{
                    p: '0.65rem 1.5rem',
                    mx: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: 'green',
                    border: 'none',
                    color: 'white',
                    '&:hover': {
                        background: 'white',
                        border: 'none',
                        color: 'green',
                    },
                }}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Login />
                </Box>
            </Modal>
        </div>
    )
}
