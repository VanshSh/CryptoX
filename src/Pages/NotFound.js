import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const notfound = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    backgroundColor: 'black',
}

const notfoundImg = {
    width: '100%',
    height: '50%',
    maxWidth: '500px',
    boxShadow: '0px 0px 10px #000',
    borderRadius: '15px',
}

const notfoundTitle = {
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '0px 0px 10px #000',
}

const notfoundNavigate = {
    color: 'blue',
    fontSize: '1.2rem',
    textShadow: '0px 0px 10px #000',
    cursor: 'pointer',
    textDecoration: 'underline',
}
const NotFound = () => {
    const [errorImg, setErrorImg] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setErrorImg('https://source.unsplash.com/random/')
    }, [])
    return (
        <div style={notfound}>
            <h1 style={notfoundTitle}>404 Error :(</h1>
            <img style={notfoundImg} src={errorImg} alt='404 Image' />
            <p style={notfoundNavigate} onClick={() => navigate('/')}>
                Go to Home Page
            </p>
        </div>
    )
}

export default NotFound
