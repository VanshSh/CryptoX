import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCryptoContext } from '../../Context'
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency, setCurrency, symbol } = useCryptoContext()

    const fetchData = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    useEffect(() => {
        fetchData()
    }, [currency])

    const items = trending.map((data) => {
        let profit = data.price_change_percentage_24h >= 0

        return (
            <Link to={`/coins/${data.id}`} className='carousel_item'>
                <img src={data.image} alt={data.name} height='100' />
                <span>{data.symbol}</span>
                &nbsp;
                <span
                    style={{
                        color: profit > 0 ? 'rgb(14, 203,129)' : 'red',
                        fontWeight: 500,
                    }}
                >
                    {profit && '+'} 0
                    {data?.price_change_percentage_24h.toFixed(2) + ' %'}
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(data.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    }

    return (
        <div className='carousel'>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    )
}

export default Carousel
