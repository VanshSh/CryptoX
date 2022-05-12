import * as React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function Footer() {
    const [value, setValue] = React.useState(0)

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '1.5rem',
                }}
            >
                <Link
                    href='https://twitter.com/Vanshsh2701'
                    target='_blank'
                    underline='none'
                >
                    <TwitterIcon fontSize='large' />
                </Link>
                <Link
                    href='https://www.linkedin.com/in/vanshsharma27/'
                    target='_blank'
                    underline='none'
                >
                    <LinkedInIcon fontSize='large' />
                </Link>
                <Link
                    href='https://github.com/VanshSh/CryptoX'
                    target='_blank'
                    underline='none'
                >
                    <GitHubIcon fontSize='large' />
                </Link>
            </Box>

            <p style={{ textAlign: 'center', fontSize: '1rem' }}>
                Made with ❤️ by Vansh Sharma
            </p>
        </>
    )
}
