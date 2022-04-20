import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from './config/api'

const CryptoContext = createContext()

export const CryptoContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

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

    return (
        <CryptoContext.Provider
            value={{
                currency,
                symbol,
                setCurrency,
                coins,
                loading,
                setLoading,
                fetchCoins,
            }}
        >
            {children}
        </CryptoContext.Provider>
    )
}

export const useCryptoContext = () => useContext(CryptoContext)
