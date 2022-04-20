import * as React from 'react'
import { useCryptoContext } from './Context'
import Snackbar from '@mui/material/Snackbar'

export default function Error() {
    const { error, setError } = useCryptoContext()

    const handleClose = () => {
        setError({ ...error, open: false })
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={(error.vertical, error.horizontal)}
                open={open}
                onClose={handleClose}
                message={error.message}
                autoHideDuration={3000}
                key={error.vertical + error.horizontal}
            />
        </div>
    )
}
