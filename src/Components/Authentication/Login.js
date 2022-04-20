import React from 'react'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

const Login = () => {
    return (
        <div>
            <p
                style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    margin: '1rem',
                }}
            >
                Login using
            </p>
            <div
                style={{
                    display: 'grid',
                    margin: '1rem',
                    gap: '1rem',
                    alignItem: 'center',
                }}
            >
                <Button
                    variant='outlined'
                    startIcon={<GoogleIcon />}
                    sx={{
                        background:
                            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        color: 'white',
                    }}
                >
                    Google
                </Button>
                <Button
                    variant='outlined'
                    startIcon={<GitHubIcon />}
                    sx={{
                        color: 'white',
                        background:
                            'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
                    }}
                >
                    GitHub
                </Button>
                <Button
                    variant='outlined'
                    startIcon={<PermIdentityIcon />}
                    sx={{
                        color: 'white',
                        background:
                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    }}
                >
                    Guest
                </Button>
            </div>
        </div>
    )
}

export default Login