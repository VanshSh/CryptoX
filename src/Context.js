import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInAnonymously,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from './firebase'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from './firebase'

const CryptoContext = createContext()

export const CryptoContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: '',
        message: '',
    })

    useEffect(() => {
        if (currency === 'INR') setSymbol('₹')
        if (currency === 'USD') setSymbol('$')
    }, [currency])

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    // Set watchlist
    useEffect(() => {
        if (user) {
            const coinRef = doc(db, 'watchlist', user.uid)
            const unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists) {
                    setWatchlist(coin.data().coins)
                } else {
                    console.log('No watchlist found')
                }
            })
            return () => {
                unsubscribe()
            }
        }
    }, [user])

    // SIGIN with Google
    const googleSignIn = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    // SIGIN with Github
    const githubSignIn = () => {
        const githubProvider = new GithubAuthProvider()
        return signInWithPopup(auth, githubProvider)
    }

    // SIGIN Anonymously
    const anonymousSignIn = () => {
        return signInAnonymously(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user)
            else setUser(null)
        })
        return () => {
            unSubscribe()
        }
    }, [])
    return (
        <CryptoContext.Provider
            value={{
                currency,
                setCurrency,
                loading,
                setLoading,
                coins,
                fetchCoins,
                alert,
                setAlert,
                user,
                setUser,
                symbol,
                watchlist,
                setWatchlist,
                anonymousSignIn,
                googleSignIn,
                githubSignIn,
            }}
        >
            {children}
        </CryptoContext.Provider>
    )
}

export const useCryptoContext = () => useContext(CryptoContext)
