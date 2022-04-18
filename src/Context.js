import React, { createContext, useContext, useState, useEffect } from 'react'

const CryptoContext = createContext()

export const CryptoContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')

    useEffect(() => {
        if (currency === 'INR') setSymbol('₹')
        if (currency === 'USD') setSymbol('$')
    }, [currency])

    return (
        <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </CryptoContext.Provider>
    )
}

export const useCryptoContext = () => useContext(CryptoContext)
