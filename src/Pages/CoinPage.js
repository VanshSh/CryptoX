import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCryptoContext } from '../Context'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import CoinInfo from '../Components/CoinInfo'
import { Typography, LinearProgress } from '@mui/material'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../Components/Banner/Carousel'

const CoinPage = () => {
    const [coin, setCoin] = useState('')
    const { symbol, currency } = useCryptoContext()
    const { id } = useParams()

    const fetchCoinData = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }
    useEffect(() => {
        fetchCoinData()
    }, [])

    if (!coin) return <LinearProgress color='success' />

    return (
        <div className='coinpage'>
            <div className='sidebar'>
                <img
                    src={coin?.image?.large}
                    alt={coin.name}
                    style={{ height: 200, marginBottom: 20 }}
                />
                <Typography variant='h3'>{coin?.name}</Typography>
                <Typography
                    variant='subtitle'
                    sx={{ padding: 2, fontSize: '1.2rem', textAlign: 'center' }}
                >
                    {ReactHtmlParser(coin.description?.en.split('. ')[0])}.
                </Typography>
                <div className='marketData'>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
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
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinPage
