import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useCryptoContext } from '../Context'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function AlertPopup() {
    const { alert, setAlert } = useCryptoContext()

    const { message, severity, open } = alert

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setAlert({ ...alert, open: false })
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{
                        width: 'fit-content',
                        margin: 'auto',
                        padding: '0.5rem 1rem',
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
