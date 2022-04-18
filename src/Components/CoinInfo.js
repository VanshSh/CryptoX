import { useState, useEffect } from 'react'
import { useCryptoContext } from '.././Context'
import axios from 'axios'
import { HistoricalChart } from '.././config/api'
import CircularProgress from '@mui/material/CircularProgress'
import { Chart } from 'react-chartjs-2'
import { daysData } from '../config/daysData'
import Button from './Button'
import 'chart.js/auto'

const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState()
    const [days, setDays] = useState(1)
    const { currency } = useCryptoContext()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, currency)
        )

        setHistoricalData(data.prices)
    }

    useEffect(() => {
        fetchHistoricalData()
    }, [currency, days])

    return (
        <>
            <div className='chart'>
                {!historicalData ? (
                    <CircularProgress
                        color='success'
                        sx={{
                            size: 250,
                        }}
                    />
                ) : (
                    <>
                        {' '}
                        <Chart
                            type='line'
                            data={{
                                labels: historicalData.map((coin) => {
                                    let date = new Date(coin[0])
                                    let time =
                                        date.getHours() > 12
                                            ? `${
                                                  date.getHours() - 12
                                              }:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()}AM`
                                    return days === 1
                                        ? time
                                        : date.toLocaleDateString()
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map(
                                            (coin) => coin[1]
                                        ),
                                        label: `Price(Past ${days} Days ) in ${currency}`,
                                        borderColor: 'green',
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                margin: '2rem',
                            }}
                        >
                            {daysData.map((data) => {
                                return (
                                    <Button
                                        key={data.value}
                                        label={data.label}
                                        value={data.value}
                                        setDayHandler={setDays}
                                        selected={data.value === days}
                                    />
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default CoinInfo
