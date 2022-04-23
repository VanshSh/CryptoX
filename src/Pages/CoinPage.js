import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCryptoContext } from '../Context'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import CoinInfo from '../Components/CoinInfo'
import { Typography, LinearProgress, Button } from '@mui/material'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../Components/Banner/Carousel'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const CoinPage = () => {
    const [coin, setCoin] = useState('')
    const { symbol, currency, user, watchlist, setAlert } = useCryptoContext()
    const { id } = useParams()

    const fetchCoinData = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }
    useEffect(() => {
        fetchCoinData()
    }, [])

    if (!coin) return <LinearProgress color='success' />
    const inWatchlist = watchlist.includes(coin?.id)

    const addToWatchlist = async () => {
        const coinRef = doc(db, 'watchlist', user.uid)
        try {
            await setDoc(coinRef, {
                coins: watchlist ? [...watchlist, coin.id] : [coin.id],
            })
            setAlert({
                open: true,
                severity: 'success',
                message: `${coin.name} added to the watchlist`,
            })
        } catch (err) {
            setAlert({
                open: true,
                severity: 'error',
                messgae: err.message,
            })
        }
    }
    console.log('Watcchlist coinpage', watchlist)
    const removeFromWatchlist = async () => {
        const coinRef = doc(db, 'watchlist', user.uid)
        try {
            await setDoc(
                coinRef,
                {
                    coins: watchlist.filter((watch) => watch !== coin.id),
                },
                { merge: 'true' }
            )
            setAlert({
                open: true,
                severity: 'success',
                message: `${coin.name} removed from the watchlist`,
            })
        } catch (err) {
            setAlert({
                open: true,
                severity: 'error',
                messgae: err.message,
            })
        }
    }

    return (
        <div className='coinpage'>
            <div className='sidebar'>
                <img
                    src={coin?.image?.large}
                    alt={coin.name}
                    style={{
                        height: 200,
                        margin: '0 auto',
                        width: '50%',
                        alignItems: 'center',
                    }}
                />
                <Typography variant='h3' sx={{ textAlign: 'center' }}>
                    {coin?.name}
                </Typography>
                <Typography
                    variant='subtitle'
                    sx={{ padding: 2, fontSize: '1.5rem', textAlign: 'left' }}
                >
                    {ReactHtmlParser(coin.description?.en.split('. ')[0])}.
                </Typography>
                <div className='market_data'>
                    <span>
                        <Typography variant='h5'>
                            Rank: {numberWithCommas(coin?.market_cap_rank)}{' '}
                        </Typography>
                        <br />
                        <Typography variant='h5'>
                            Current Price: {symbol}{' '}
                            {numberWithCommas(
                                coin?.market_data.current_price[
                                    currency.toLowerCase()
                                ]
                            )}
                        </Typography>
                        <br />
                        <Typography variant='h5'>
                            Market cap: {symbol}{' '}
                            {numberWithCommas(
                                coin?.market_data.market_cap[
                                    currency.toLowerCase()
                                ]
                                    .toString()
                                    .slice(0, -6)
                            )}{' '}
                            M
                        </Typography>
                    </span>
                    {user && (
                        <Button
                            sx={{
                                width: '100%',
                                backgroundColor: 'green',
                                m: '2rem auto',
                                backgroundColor: inWatchlist ? 'red' : 'green',
                            }}
                            onClick={
                                inWatchlist
                                    ? removeFromWatchlist
                                    : addToWatchlist
                            }
                            variant='contained'
                        >
                            {inWatchlist
                                ? 'Remove from watchlist'
                                : 'Add to watchlist'}
                        </Button>
                    )}
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinPage
