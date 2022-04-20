import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { useCryptoContext } from '../Context'
import { numberWithCommas } from './Banner/Carousel'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    TextField,
    Typography,
    TableContainer,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody,
    LinearProgress,
    Pagination,
} from '@mui/material'

const CoinsTable = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const { currency, symbol, coins, loading, setLoading, fetchCoins } = useCryptoContext()
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const filterSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

   
    useEffect(() => {
        fetchCoins()
    }, [currency])

    const onPageChangeHandler = (_, value) => {
        setPage(value)
        window.scroll(0, 450)
    }
    return (
        <Container sx={{ textAlign: 'center' }}>
            <Typography variant='h4'>Search Cryptos</Typography>
            <TextField
                label='Search For a Crypto Currency.. '
                sx={{ color: 'white', backgroundColor: 'white', my: 2 }}
                className='searchBar'
                value={search}
                onChange={onChangeHandler}
            />
            <TableContainer sx={{ backgroundColor: '#191a19' }}>
                {loading ? (
                    <LinearProgress color='success' />
                ) : (
                    <>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#6afc91' }}>
                                <TableRow>
                                    {[
                                        'Coin',
                                        'Price',
                                        '24h Change',
                                        'Market Cap',
                                    ].map((head) => (
                                        <TableCell
                                            sx={{
                                                color: 'black',
                                                fontWeight: '700',
                                                fontSize: '1.2rem',
                                            }}
                                            key={head}
                                            align={
                                                head === 'Coin' ? '' : 'right'
                                            }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterSearch()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10
                                    )
                                    .map((row) => {
                                        const profit =
                                            row.price_change_percentage_24h > 0

                                        return (
                                            <TableRow
                                                onClick={() =>
                                                    navigate(`/coins/${row.id}`)
                                                }
                                                key={row.name}
                                                className='tableRow'
                                                sx={{
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <TableCell
                                                    component='th'
                                                    scope='row'
                                                    sx={{ color: 'white' }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height='50'
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    'uppercase',
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span>{row.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    sx={{
                                                        color: 'white',
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    {symbol}{' '}
                                                    {numberWithCommas(
                                                        row.current_price.toFixed(
                                                            2
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? 'rgb(14, 203, 129)'
                                                                : 'red',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && ' +'}
                                                    {row.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </TableCell>
                                                <TableCell
                                                    align='right'
                                                    sx={{ color: 'white' }}
                                                >
                                                    {symbol}{' '}
                                                    {numberWithCommas(
                                                        row.market_cap
                                                            .toString()
                                                            .slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </>
                )}
            </TableContainer>
            {!loading && (
                <Pagination
                    hideNextButton
                    hidePrevButton
                    count={(filterSearch().length / 10).toFixed(0)}
                    color='primary'
                    sx={{ p: 2, display: 'flex', justifyContent: 'center' }}
                    className='pagination'
                    onChange={onPageChangeHandler}
                />
            )}
        </Container>
    )
}

export default CoinsTable
